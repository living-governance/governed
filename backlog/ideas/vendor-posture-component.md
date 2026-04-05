# Vendor AI Security Posture Component

Evaluate major platforms (OpenAI, Anthropic, Google, AWS Bedrock, Azure AI,
Cohere) on what security controls they actually provide for agentic use cases.
Not marketing claims — observable capabilities.

Does the platform support tool-call auditing? Credential scoping? Output
filtering? Rate limiting per agent? Structured evaluation per dimension.

Methodology similar to framework-coverage: binary scoring across defined
dimensions. High staleness risk (validity window ~60 days) because platforms
ship security features constantly.

The component that answers "which platform gives me the most to work with
when building secure agents?"
