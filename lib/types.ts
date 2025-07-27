// lib/types.ts
// Core types for Living Knowledge Protocol

export interface Source {
  name: string;
  url: string;
  version?: string;
  lastChecked?: Date;
}

export interface Evaluation {
  date: Date;
  by: string;
  validDays: number;
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
