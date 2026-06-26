---
title: "EU AI Act Compliance Checklist for AI Product Builders (2025)"
description: "What AI product builders need to know about the EU AI Act — which obligations apply to you, what to disclose, and how to document your system."
date: "2025-05-15"
---

The EU AI Act became fully applicable in stages through 2025 and 2026. If you build an AI product and have any users in the European Union, you need to understand which obligations apply to you — even if your company is based in the US or elsewhere.

This checklist covers the practical steps for most SaaS and AI product builders.

## Does the EU AI Act Apply to You?

The Act applies to:

- AI systems **placed on the market** or **put into service** in the EU
- AI systems whose **output is used** in the EU

This means geographic location of your company doesn't matter. If you have EU users, you're likely in scope.

**Exception**: purely personal, non-professional use.

## Risk Classification: Which Category Are You?

The Act uses a four-tier risk classification. Your obligations depend on your tier.

### Unacceptable Risk (Banned)
Systems used for:
- Social scoring by governments
- Real-time biometric surveillance in public spaces
- Subliminal manipulation that harms users

**Action**: If your product does any of this, it's prohibited in the EU.

### High Risk
Systems used in:
- Critical infrastructure
- Education and vocational training
- Employment and worker management
- Access to essential services (credit, insurance)
- Law enforcement
- Border control
- Administration of justice

**Action**: High-risk systems face strict requirements: conformity assessments, technical documentation, human oversight, accuracy and robustness standards.

### Limited Risk (Most SaaS AI Products)
Systems that:
- Interact with humans (chatbots, virtual assistants)
- Generate synthetic content (text, images, audio, video)
- Use emotion recognition or biometric categorization

**This is where most AI SaaS products fall.**

### Minimal Risk
General-purpose tools, AI-enabled spam filters, basic recommendation systems.

## Obligations for Limited-Risk Systems

If you run a chatbot, AI writing tool, AI image generator, or similar product, you fall under **limited risk**. Your obligations are transparency-focused:

### 1. Disclose that users are interacting with AI

Users must be informed when they're interacting with an AI system — unless it's obvious from the context.

**What to add to your UI:**
- A label or badge indicating "Powered by AI" or "AI assistant"
- A note in onboarding that the product uses AI to generate responses

**What to add to your privacy policy:**
> "Our product uses artificial intelligence to generate content and responses. You are interacting with an AI system, not a human."

### 2. Label AI-generated content

If your system generates images, audio, or video that could be mistaken for real content (deepfakes), you must label it as AI-generated.

For text-only tools, this obligation is lighter — but transparency is still best practice.

### 3. Disclose emotion recognition (if applicable)

If your system analyzes or infers emotions, users must be informed.

## General-Purpose AI Models (GPAI)

If you're building on top of a model like GPT-4 or Claude, you're using a GPAI model. The Act places obligations on the **providers** of these models (OpenAI, Anthropic, etc.), not on you as a downstream deployer — but you should:

- Reference which GPAI model(s) you use in your documentation
- Understand the usage policies of your model provider as they relate to compliance

## Privacy Policy Additions for EU AI Act Compliance

Your privacy policy should include a section that covers:

```
AI Transparency (EU AI Act)

[App Name] uses artificial intelligence to provide [describe service]. 
In accordance with the EU AI Act, we disclose that:

- You are interacting with an AI system.
- AI-generated content may not always be accurate and should be reviewed before use.
- [If applicable] Our system makes automated recommendations based on [criteria]. 
  You have the right to request human review of decisions that significantly affect you.
```

## Documentation Requirements

Even for limited-risk systems, it's good practice (and may be required depending on your system's eventual reclassification) to maintain:

- **System description**: What the AI does, what inputs it takes, what outputs it produces
- **Training data summary**: What data was used (if you fine-tune your own model)
- **Third-party model documentation**: Links to the model cards of any GPAI models you use
- **Human oversight mechanisms**: How humans can review or override AI outputs
- **Incident log**: Any cases where the AI produced harmful or inaccurate outputs

## Checklist Summary

Use this before launch or when updating your AI product for EU compliance:

**Legal documents**
- [ ] Privacy policy discloses AI usage and which providers receive data
- [ ] Privacy policy includes EU AI Act transparency statement
- [ ] Terms of Service clarify AI output limitations and user responsibilities
- [ ] If automated decisions are made: user rights (explanation, contest, human review) are documented

**UI / Product**
- [ ] Users are informed they're interacting with AI
- [ ] AI-generated content is labeled (especially images/video/audio)
- [ ] Opt-out mechanism for data use (if applicable)

**Internal documentation**
- [ ] System purpose and scope documented
- [ ] Third-party model providers and their policies documented
- [ ] Incident response procedure defined

**Ongoing**
- [ ] Monitor EU AI Act enforcement updates (full enforcement began August 2026 for most obligations)
- [ ] Review when adding new AI features or switching model providers

## Generate Your Compliant Policy

The fastest way to get a compliant privacy policy and terms of service for your AI product is to use [AI Policy Gen](/). The generator includes EU AI Act transparency clauses and GDPR Article 22 disclosures as part of its AI-specific output.

It takes about 3 minutes and requires no legal expertise.

---

*This article is for informational purposes only and does not constitute legal advice. Consult a qualified attorney for advice specific to your situation.*
