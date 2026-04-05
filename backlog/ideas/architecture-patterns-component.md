# Agent Architecture Patterns Component

ReAct, multi-agent orchestration, tool-use chains, RAG-augmented agents —
each has fundamentally different attack surfaces. A multi-agent system has
lateral movement risks that a single-agent tool-user doesn't. A RAG agent
has poisoning vectors that a code-execution agent doesn't.

No public resource maps common architectural patterns to their security
properties side by side.

Methodology: for each pattern, enumerate trust boundaries, privilege
surfaces, and map which threats from the threats component apply. Binary
evaluation of security properties per pattern.

The component that answers "we're building X architecture, what should
we worry about?"
