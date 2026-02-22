# Bump-Version Script

Small prey. A script that updates version in both `packages/{name}/package.json`
and `packages/{name}/src/index.ts` atomically. Eliminates manual drift risk
from AGENTS.md Rule 4. Dry-run flag. Fails if either file missing.

Kill on the spot in next session.
