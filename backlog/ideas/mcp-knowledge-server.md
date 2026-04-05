# MCP Knowledge Server

Expose the knowledge layer as an MCP server so any AI assistant can query
live, self-aware governance knowledge mid-conversation.

Today: an AI helping with security architecture guesses from training data
with no temporal awareness, no methodology transparency, no scope boundaries.
It sounds authoritative but has no mechanism to signal when it shouldn't be.

With an MCP server: the AI calls a tool, gets typed data with confidence
status, scope declarations, evaluation methodology, and staleness signals.
It can relay "this evaluation was performed on 2026-02-20, valid for 90 days,
currently Fresh" instead of generating an opinion from memory.

This is the agency layer (Tier 2) making the "executable knowledge consumed
by machines" promise literal. The knowledge is already structured for it —
typed exports, confidence computation functions, scope fields. The MCP server
is the transport.

Potential tools to expose:
- Query threats by category, severity, taxonomy
- Get framework coverage scores with methodology
- Get mitigations for a specific threat
- Check confidence status across all components
- Get scope declarations (what this knowledge covers and doesn't)

Connects to: every component. The MCP server is the horizontal access layer,
not a component itself. Consider whether it lives in packages/ or as part
of the agency layer on the site (vercel.json already references an MCP route).
