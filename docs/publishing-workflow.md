# Publishing Workflow (Knowledge Updates)

1. Edit knowledge in `registry/knowledge/`
2. Archive current version (Rule: Archive Before Updating Knowledge)
3. Copy to package (Rule: Registry Is Truth)
4. Bump version (Rule: Version Bump)
5. Build: `npx tsc --noEmit` in the package directory
6. User runs: `npm publish` (requires auth)
7. Commit and push

## New Component Creation

No established workflow yet. Work with the user interactively.
See decisions/PENDING-003-new-component-workflow.md.
