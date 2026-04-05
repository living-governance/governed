// lib/types.ts
// Core types for Living Knowledge Protocol

export interface Source {
  name: string;
  url: string;
  version?: string;
  lastChecked?: Date;
}

export type VerificationStatus = 'human-verified' | 'agent-evaluated' | 'human-disputed';

export interface Evaluation {
  date: Date;
  by: string;
  validDays: number;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  methodology?: string;
  sources?: Source[];
  confidence?: number;
  limitations?: string[];
  nextEvaluation?: Date;
}

export interface TimelineEntry {
  date: Date;
  by: string;
  change: string;
  insight?: string;
  trigger?: string;
}

export interface EvaluationRun {
  id: string;
  artifactId: string;
  date: Date;
  evaluatedBy: string;
  evaluatorType: 'human' | 'agent';
  trigger: 'decay' | 'source-change' | 'manual';
  previousArchive: string;
  scoreDeltas: Record<string, number>;
  sourcesChecked: string[];
  sourcesChanged: boolean;
  summary: string;
  verificationStatus: VerificationStatus;
}

export interface KnowledgeMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  details: string[];
}

export interface KnowledgeArtifact {
  metadata: KnowledgeMetadata;
  data: any;
  evaluation: Evaluation;
  updateInstructions: string;
  timeline: TimelineEntry[];
  
  // Optional advanced features
  predictions?: any;
  perspectives?: any;
  exercises?: any;
  bounties?: any;
}
