# ADR-012: Component Sizing, Tiling & Mobile Stacking

**Date:** February 2026
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

With two components now in the registry (`framework-coverage`, `threats`) and more planned,
we need a standardized approach to component dimensions so that:

1. Components tile predictably in dashboard grids
2. View switching within a component doesn't cause layout jumps
3. Mobile layouts degrade gracefully without per-component overrides
4. New contributors know what size constraints to design within

Both existing components already use `h-[600px]` and `flex flex-col` but this is implicit
convention, not documented policy.

## Decision

### Fixed Height, Fluid Width

All governed components use a **fixed height of 600px** and **fluid width** (fill their
grid cell). This means:

```tsx
<Card className="h-[600px] flex flex-col">
```

**Why 600px:**
- Fits comfortably in a 2-column desktop grid without scrolling the page
- Tall enough for meaningful data visualization
- Short enough that two rows are visible on a 1080p monitor
- Matches common dashboard widget proportions

**Why fixed height matters:**
- View switching (icon bar navigation) must not change card dimensions
- Adjacent components in a grid row stay aligned
- Predictable scroll behavior within each component

### Internal Layout Contract

Every component follows this vertical structure:

```
┌──────────────────────┐
│ CardHeader (fixed)   │  — Title, confidence badge, description
├──────────────────────┤
│ CardContent (flex)   │  — flex-1 flex flex-col overflow-hidden
│  ┌─────────────────┐ │
│  │ Scrollable area │ │  — flex-1 overflow-y-auto
│  │                 │ │
│  └─────────────────┘ │
│  ┌─────────────────┐ │
│  │ Icon bar (fixed)│ │  — flex-shrink-0, border-t
│  └─────────────────┘ │
└──────────────────────┘
```

The icon bar is always pinned to the bottom. Content scrolls within the middle zone.

### Grid Tiling

The dashboard page uses responsive CSS grid:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <FrameworkCoverage />
  <Threats />
</div>
```

- **Mobile** (`< lg`): Single column, components stack vertically at full width
- **Desktop** (`>= lg`): Two columns, components tile side by side
- **No explicit width** on components — they fill their grid cell

Future consideration: a 3-column layout for wide monitors (`xl:grid-cols-3`) may be
added when we have 6+ components, but this is deferred.

### View Consistency

When a user clicks an icon to switch views (e.g., from "Incidents" to "Methodology"),
the card dimensions must not change. This is enforced by:

1. The `h-[600px]` on the outer Card
2. `flex-1 overflow-y-auto` on the scrollable content area
3. `flex-shrink-0` on the icon bar footer

All views — main, metadata, download, share — render within the same fixed envelope.

### Icon Bar Standard

Every component includes a standard icon bar with view navigation. The icon bar is
divided into sections by `<div className="w-px h-6 bg-border mx-1" />` separators:

```
[Domain-specific views] | [Meta views] | [Action views]
```

Where:
- **Domain views** = Component-specific content (incidents, threats, coverage, etc.)
- **Meta views** = Sources, Methodology, Evolution/History, Cloud guidance
- **Action views** = Download, Share (with LinkedIn/X inline buttons)

Not all components need all meta views. The minimum set is:
- At least one domain view (the default/home view)
- Sources
- Methodology
- Download

Share actions (LinkedIn, X) appear as inline buttons in the icon bar footer,
separated from navigation icons, consistent with the framework-coverage pattern.

## Consequences

### Positive
- New components are predictable — contributors know the constraints
- Dashboard assembly is trivial — just put components in a grid
- Mobile works without per-component responsive logic
- View switching is smooth — no layout jumps

### Negative
- 600px may feel cramped for data-heavy components — they must design for scroll
- Very simple components (e.g., a single metric) may feel over-sized — we accept
  this tradeoff for grid consistency
- If we later need variable-height components, this ADR must be revised

### Risks
- None significant. Both existing components already follow this pattern implicitly.

## Alternatives Considered

1. **Variable height per component** — Rejected because it breaks grid alignment
   and makes dashboard assembly unpredictable
2. **Aspect-ratio based sizing** — Too complex for the current stage; 600px is
   simple and works
3. **CSS Container Queries** — Interesting but premature; fixed height is sufficient
   for our current 2-column grid
