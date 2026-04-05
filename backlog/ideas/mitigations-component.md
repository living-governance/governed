# Mitigations Component

Natural complement to threats. Threats answers "what can go wrong,"
mitigations answers "what do you do about it."

The threats component already has `mitigationIds` and sparse mitigation data.
A dedicated component would catalog mitigations cross-referenced to threats,
mapped to cloud services (AWS, Azure, GCP), with implementation maturity
levels (conceptual/available/battle-tested).

Methodology: evaluate each mitigation for threat coverage completeness,
implementation feasibility, and evidence of effectiveness. Binary scoring
similar to framework-coverage.

Completes the threat-to-mitigation loop. The component a security architect
reaches for right after seeing the threats card.
