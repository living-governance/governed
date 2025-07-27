// lib/types.ts
// Core types for Living Knowledge Protocol

export interface Source {
  name: string;
  url: string;
  version?: string;
  lastChecked?: Date;
}

export interface Evaluation {
  evalu