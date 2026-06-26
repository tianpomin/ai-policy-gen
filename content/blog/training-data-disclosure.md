---
title: "Training Data Disclosure: What Your AI Product's Privacy Policy Must Say"
description: "Do you need to disclose whether your AI uses customer data for training? Yes — here's exactly what to say and how to handle opt-outs."
date: "2025-04-20"
---

One of the most common questions users ask about AI products is simple: "Is my data being used to train the AI?"

The answer — and how clearly you communicate it — has legal and reputational consequences. This guide explains what you need to disclose and how to write the training data section of your privacy policy.

## Why This Matters

Training data disclosure sits at the intersection of three growing concerns:

1. **Regulatory requirements**: GDPR requires a legal basis for any processing of personal data, including use for model training. CCPA requires disclosure of data "selling" or "sharing," which may include sharing with model providers.

2. **User expectations**: After several high-profile controversies around AI training data, users are acutely aware of this issue. Opaque policies create churn and support tickets.

3. **Competitive differentiation**: Being explicit that you *don't* use data for training — when true — is a competitive advantage, especially in B2B and enterprise markets.

## The Three Scenarios

### Scenario A: You Use an AI API and the Provider Doesn't Train on API Data

Most major AI providers — OpenAI, Anthropic, Google (via API) — do not use API inputs to train their foundation models by default. Enterprise agreements often explicitly prohibit this.

**What to say:**
> "When you use our AI features, your inputs are sent to [Provider Name] for processing via their API. [Provider Name] does not use API inputs to train its AI models. Your data is not retained by [Provider Name] beyond the time required to generate a response."

Include a link to the provider's data processing agreement or privacy documentation.

### Scenario B: You Fine-Tune Your Own Model on User Data

If you're collecting user interactions to fine-tune a model — even an anonymized or aggregated version — this is material and must be disclosed.

**What to say:**
> "We may use anonymized and aggregated interaction data to fine-tune and improve our AI models. This data is processed in a form that cannot be linked back to individual users. You may opt out of this use by [method — e.g., contacting us at privacy@yourcompany.com or adjusting your account settings]."

Under GDPR, you need a legal basis for this processing. Legitimate interest or consent are the most common — if you rely on consent, users must be able to withdraw it easily.

### Scenario C: You Use a Provider That Does Train on User Inputs

Some free-tier AI services train on user inputs unless you opt out. If you're building on such a service, you must disclose this — and consider whether it's compatible with your users' expectations.

**What to say:**
> "We use [Provider Name] to power AI features in our product. Unless you opt out, [Provider Name] may use your inputs to improve its AI models, in accordance with their privacy policy: [link]. To opt out of this use, [describe opt-out method or link to provider instructions]."

## Opt-Out Rights

Even when training data use is legal, good practice (and increasingly regulation) requires you to give users a way to opt out.

**For EU users**: Under GDPR, if you rely on legitimate interest as your legal basis, users have the right to object. If you rely on consent, they have the right to withdraw it.

**For California users**: CCPA gives users the right to opt out of the "sale" or "sharing" of their personal information. Whether fine-tuning counts as "sharing" is still being interpreted, but err on the side of disclosure.

**Practical implementation**:
- Add a "Data & Privacy" section to your account settings
- Include a clear toggle or contact method for opting out of AI training use
- Honor opt-out requests promptly (GDPR requires without undue delay; CCPA within 15 business days)

## What Not to Say

**Avoid vague language**:
- ❌ "We may use your data to improve our services."
- ✅ "We do not use your conversation data to train AI models. [Provider] processes your inputs in real time and does not retain them for training purposes."

**Don't bury it**:
Training data disclosure should be in a named section of your privacy policy, not buried in a generic "how we use your data" paragraph. Users are specifically looking for this.

**Don't copy-paste from your model provider**:
Your privacy policy should describe *your* data practices. Pointing users to OpenAI's privacy policy instead of explaining what *you* do is not sufficient.

## Sample Privacy Policy Section

Here's a template you can adapt:

---

**AI Processing and Training Data**

Our product uses AI features powered by [Provider Name]. When you submit content to our AI features, your input is sent to [Provider Name]'s API for processing.

**Does [Provider Name] train on your data?** No. [Provider Name] does not use inputs submitted via the API to train its AI models. [Link to provider DPA]

**Do we train our own models on your data?** [Choose one:]
- No. We do not use your content to train or fine-tune AI models.
- We may use anonymized, aggregated interaction data to improve our AI features. Individual conversations cannot be reconstructed from this data. You may opt out at [method].

**Who else has access to your inputs?** Your inputs are transmitted to [Provider Name] for processing and are subject to their data retention policies. We do not sell your conversation data to any third party.

---

## Use AI Policy Gen to Generate This Section

[AI Policy Gen](/) is a free generator that creates privacy policies specifically designed for AI products. It asks you directly whether you use data for training and whether users can opt out — then generates the correct disclosure language for your situation.

The generator also covers LLM provider naming, EU AI Act clauses, GDPR/CCPA rights sections, and automated decision-making disclosure.

---

*This article is for informational purposes only and does not constitute legal advice.*
