# ADR-013: New Component Creation Workflow

**Date:** February 2026
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)
**Resolves:** PENDING-003

---

## Context

After building two components (`framework-coverage` and `threats`), the creation
workflow has stabilized. We need to document it so new contributors (human or AI)
can create components without the principal architect in the room.

The workflow emerged from practice, not theory. Both components followed a
Hunt → Unleash → Verify cycle (see METHODOLOGY.md).

## Decision

### Component Creation Workflow

#### Step 1: Hunt the Knowledge

Before writing any code, define the knowledge structure:

1. **Identify the domain** — What does this component know about?
2. **Gather sources** — Primary sources only. No secondary aggregators.
3. **Draft the ontology** — Entities, relationships, scoring criteria.
4. **Collaborate with AI** — Refine taxonomy and cross-references interactively.

Output: A mental model of the knowledge, ready for encoding.

#### Step 2: Create the Knowledge File

Create `registry/knowledge/<component-name>.ts` following ONTOLOGY.md:

- Export a typed knowledge object as the single source of truth
- Include `metadata`, `evaluation`, `scope`, `dissent`, `sources` sections
- Include confidence scoring with 90-day decay (ADR-004)
- Include `updateInstructions` so anyone (human or AI) can refresh the data
- Export utility functions for computed values (summaries, lookups, etc.)

The knowledge file is the foundation. No component code until this is solid.

#### Step 3: Create the Component

Create `registry/components/<component-name>.tsx` following ADR-012:

1. **Copy `_TEMPLATE.tsx`** — It provides the ADR-012 compliant skeleton
2. **Import from your knowledge file** — Component only renders, never owns data
3. **Define your ViewType** — Domain views + required meta views
4. **Build views** — One function per view, all render within the fixed card
5. **Wire the icon bar** — Domain views | Meta views | Action views

Required minimum views:
- At least one domain view (default)
- Sources
- Methodology
- Download

Share actions (LinkedIn, X) are inline in the icon bar, not a separate view.

#### Step 4: Test in Isolation

Add your component to `app/test/page.tsx` in the responsive grid:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <ExistingComponent />
  <YourNewComponent />
</div>
```

Verify:
- All views render without overflow at 600px height
- Icon bar stays pinned to bottom across all views
- Mobile single-column stacking works
- Confidence badge and decay calculation are correct
- Download view has correct CLI/NPM commands
- Share buttons generate sensible text

#### Step 5: Cross-Link (if applicable)

If your component references entities from other components (e.g., threats
referencing frameworks), add navigation functions that cross-link between them.
The components remain self-contained — cross-linking is through shared IDs in
knowledge files, not component dependencies.

### File Naming Convention

```
registry/knowledge/<component-name>.ts     # Knowledge (flat, ONTOLOGY.md)
registry/components/<component-name>.tsx   # Component (flat, ADR-012)
```

No subdirectories. No category folders. Metadata handles categorization (ADR-006).

### What the Template Provides

`_TEMPLATE.tsx` gives you:
- ADR-012 compliant card structure (h-[600px], flex col)
- Icon bar with view switching
- LinkedIn + X share buttons with clipboard copy
- Download view with CLI/NPM install commands
- Confidence badge with tooltip
- Toast notification for share actions

You replace the placeholder views with your actual content.

## Consequences

### Positive
- Any contributor can create a component by following these steps
- The template eliminates boilerplate decisions
- Knowledge-first approach prevents building UI around bad data
- Cross-linking pattern scales without coupling

### Negative
- Template may drift from actual component patterns — must be updated when
  the pattern evolves
- Two existing components use slightly different view architectures
  (framework-coverage has a back button pattern; threats has a unified router).
  The template follows the threats pattern, which is cleaner.

### Migration Note
`framework-coverage` should eventually be refactored to match the unified
view router pattern used by `threats` and `_TEMPLATE.tsx`. This is cosmetic,
not blocking.

## Alternatives Considered

1. **Code generator (CLI scaffolding)** — Premature. Copy-paste from template
   is fine at this scale.
2. **Shared base component class** — Rejected. Self-contained means each
   component is independent, not inheriting from a base.
3. **Storybook for testing** — Overkill. The test page is sufficient.
