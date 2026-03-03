#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const failures = [];

function fail(message) {
  failures.push(message);
}

function getPropertyName(nameNode) {
  if (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode)) {
    return nameNode.text;
  }
  return null;
}

function getObjectProperty(objectNode, propertyName) {
  for (const prop of objectNode.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = getPropertyName(prop.name);
    if (name === propertyName) {
      return prop;
    }
  }
  return null;
}

function countScoredObjectsMissingRationale(sourceFile) {
  let missing = 0;

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const hasScores = getObjectProperty(node, "scores");
      if (hasScores) {
        const rationale = getObjectProperty(node, "scoringRationale");
        if (!rationale) {
          missing += 1;
        } else if (
          ts.isArrayLiteralExpression(rationale.initializer) &&
          rationale.initializer.elements.length === 0
        ) {
          missing += 1;
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return missing;
}

function findKnowledgeExportObject(sourceFile) {
  const candidates = [];

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const isExported = statement.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) continue;

    for (const decl of statement.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      if (!decl.initializer || !ts.isObjectLiteralExpression(decl.initializer))
        continue;
      candidates.push({
        name: decl.name.text,
        objectNode: decl.initializer,
      });
    }
  }

  const knowledgeNamed = candidates.find((c) => c.name.endsWith("Knowledge"));
  return knowledgeNamed ?? candidates[0] ?? null;
}

function validateKnowledgeFile(filePath) {
  const relativePath = path.relative(repoRoot, filePath);
  const sourceText = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const knowledgeExport = findKnowledgeExportObject(sourceFile);
  if (!knowledgeExport) {
    fail(`${relativePath}: no exported knowledge object found`);
    return;
  }

  const { name: knowledgeName, objectNode } = knowledgeExport;

  const evaluationProp = getObjectProperty(objectNode, "evaluation");
  if (!evaluationProp || !ts.isObjectLiteralExpression(evaluationProp.initializer)) {
    fail(`${relativePath} (${knowledgeName}): missing evaluation object`);
  } else {
    const evaluationObject = evaluationProp.initializer;
    for (const field of ["date", "by", "validDays", "methodology"]) {
      if (!getObjectProperty(evaluationObject, field)) {
        fail(`${relativePath} (${knowledgeName}): missing evaluation.${field}`);
      }
    }

    const hasEvaluationUpdateInstructions = Boolean(
      getObjectProperty(evaluationObject, "updateInstructions"),
    );
    const hasTopLevelUpdateInstructions = Boolean(
      getObjectProperty(objectNode, "updateInstructions"),
    );
    if (!hasEvaluationUpdateInstructions && !hasTopLevelUpdateInstructions) {
      fail(
        `${relativePath} (${knowledgeName}): missing updateInstructions (evaluation.updateInstructions or top-level updateInstructions)`,
      );
    }
  }

  const scopeProp = getObjectProperty(objectNode, "scope");
  if (!scopeProp || !ts.isObjectLiteralExpression(scopeProp.initializer)) {
    fail(`${relativePath} (${knowledgeName}): missing scope object`);
  } else {
    const scopeObject = scopeProp.initializer;
    if (!getObjectProperty(scopeObject, "appliesTo")) {
      fail(`${relativePath} (${knowledgeName}): missing scope.appliesTo`);
    }
    if (!getObjectProperty(scopeObject, "doesNotApplyTo")) {
      fail(`${relativePath} (${knowledgeName}): missing scope.doesNotApplyTo`);
    }
  }

  const dissentProp = getObjectProperty(objectNode, "dissent");
  if (!dissentProp || !ts.isObjectLiteralExpression(dissentProp.initializer)) {
    fail(`${relativePath} (${knowledgeName}): missing dissent object`);
  } else if (dissentProp.initializer.properties.length === 0) {
    fail(`${relativePath} (${knowledgeName}): dissent object must not be empty`);
  }

  const missingRationaleCount = countScoredObjectsMissingRationale(sourceFile);
  if (missingRationaleCount > 0) {
    fail(
      `${relativePath} (${knowledgeName}): ${missingRationaleCount} scored evaluation object(s) missing scoringRationale`,
    );
  }
}

function checkRegistryPackageParity(knowledgeFile) {
  const packagesDir = path.join(repoRoot, "packages");
  if (!fs.existsSync(packagesDir)) return;

  const knowledgeContent = fs.readFileSync(knowledgeFile, "utf8");
  const knowledgeRelative = path.relative(repoRoot, knowledgeFile);
  const fileName = path.basename(knowledgeFile);

  for (const packageName of fs.readdirSync(packagesDir)) {
    const packagePath = path.join(packagesDir, packageName);
    if (!fs.statSync(packagePath).isDirectory()) continue;

    const candidate = path.join(packagePath, "src", fileName);
    if (!fs.existsSync(candidate)) continue;

    const packageContent = fs.readFileSync(candidate, "utf8");
    if (knowledgeContent !== packageContent) {
      fail(
        `${knowledgeRelative}: out of sync with ${path.relative(repoRoot, candidate)} (C-05 registry parity violation)`,
      );
    }
  }
}

function main() {
  const knowledgeDir = path.join(repoRoot, "registry", "knowledge");
  const files = fs
    .readdirSync(knowledgeDir)
    .filter((file) => file.endsWith(".ts"))
    .filter((file) => file !== "_TEMPLATE.ts")
    .map((file) => path.join(knowledgeDir, file));

  for (const file of files) {
    validateKnowledgeFile(file);
    checkRegistryPackageParity(file);
  }

  if (failures.length > 0) {
    console.error("Ontology check failed:\n");
    for (const issue of failures) {
      console.error(`- ${issue}`);
    }
    console.error(`\n${failures.length} violation(s) found.`);
    process.exit(1);
  }

  console.log(`Ontology check passed for ${files.length} knowledge artifact(s).`);
}

main();
