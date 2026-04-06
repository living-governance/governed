---
status: claimed
---

# MCP Knowledge Server

## Intent
Expose the knowledge layer as an MCP server so any AI assistant can
query live, self-aware governance knowledge mid-conversation. Deployed
on Vercel alongside the existing site using Streamable HTTP transport.

This is the first Tier 2 (agency layer) capability. The knowledge is
already structured for it — typed exports, confidence computation,
scope fields. The MCP server is the transport.

## Ontology
Agency Layer — outward-facing API that exposes knowledge (ADR-003).
Self-Awareness Metadata — confidence status queryable via MCP tool.
Scope — consumers can check what knowledge covers before relying on it.
Component — knowledge layer exposed without presentation dependency.

## Done when
- MCP server deployed at living-governance.com/api/mcp
- Streamable HTTP transport working with Claude Desktop and Cursor
- Tools: get_confidence_status, get_framework_scores, get_threat_catalog,
  get_mitigations, get_coverage_gaps, get_scope
- Each tool returns structured JSON with typed data
- Server responds correctly to tools/list and tool invocations
- Verified working from Claude Desktop with configured MCP server
- Verified working from curl (JSON-RPC tools/list returns tool array)
