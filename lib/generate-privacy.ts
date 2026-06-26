import { PolicyFormData } from './types'

export interface DocSection {
  id: string
  title: string
  content: string
}

export interface GeneratedDoc {
  title: string
  intro: string
  sections: DocSection[]
  lastUpdated: string
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function listDataTypes(d: PolicyFormData): string {
  const types: string[] = []
  if (d.collectsName) types.push('names')
  if (d.collectsEmail) types.push('email addresses')
  if (d.collectsPayment) types.push('payment information')
  if (d.collectsLocation) types.push('location data')
  if (d.collectsDeviceInfo) types.push('device information and identifiers')
  if (d.collectsUsageData) types.push('usage data and analytics')
  if (d.collectsUserContent) types.push('user-generated content')
  return types.length > 0 ? types.join(', ') : 'basic account information'
}

const AI_PROVIDER_NAMES: Record<string, string> = {
  openai: 'OpenAI (ChatGPT / GPT-4)',
  anthropic: 'Anthropic (Claude)',
  google: 'Google (Gemini / Vertex AI)',
  azure: 'Microsoft Azure OpenAI',
  'self-hosted': 'self-hosted AI models operated by us',
}

function aiProviderList(d: PolicyFormData): string {
  return d.aiProviders
    .map(p => AI_PROVIDER_NAMES[p] ?? (p === 'other' ? (d.aiProviderOther || 'third-party AI providers') : p))
    .join(', ')
}

export function generatePrivacyPolicy(d: PolicyFormData): GeneratedDoc {
  const sections: DocSection[] = []

  // 1. Information We Collect
  let collectContent =
    `We collect information you provide directly to us, including ${listDataTypes(d)}.\n\n` +
    `We also automatically collect certain information when you access or use ${d.appName}, including:\n\n` +
    `• Log data (IP address, browser type, pages visited, time and date of visit)\n` +
    `• Device information (hardware model, operating system, unique device identifiers)\n` +
    `• Usage information (features used, actions taken within the Service)`
  if (d.usesCookies) {
    collectContent += `\n• Cookies and similar tracking technologies (see Cookies section below)`
  }
  sections.push({ id: 'collection', title: 'Information We Collect', content: collectContent })

  // 2. How We Use Information
  const useItems = [
    `Provide, operate, maintain, and improve ${d.appName}`,
    `Process transactions and send transaction-related communications`,
    `Respond to your comments, questions, and customer support requests`,
    `Send technical notices, security alerts, and administrative messages`,
    `Monitor and analyze usage patterns and trends to improve user experience`,
    `Detect, prevent, and investigate fraud, security incidents, and abuse`,
    `Comply with legal obligations`,
  ]
  if (d.usesAI) useItems.push(`Power AI-based features and generate AI-assisted outputs`)
  if (d.hasNewsletter) useItems.push(`Send promotional communications (you may opt out at any time)`)

  sections.push({
    id: 'use',
    title: 'How We Use Your Information',
    content: `We use the information we collect to:\n\n${useItems.map(i => `• ${i}`).join('\n')}`,
  })

  // 3. AI Processing (conditional)
  if (d.usesAI) {
    let aiContent =
      `${d.appName} uses artificial intelligence and machine learning technologies to deliver certain features. ` +
      `This section describes how AI processing affects your personal data.\n\n`

    if (d.userDataSentToAI && d.aiProviders.length > 0) {
      aiContent +=
        `**Third-Party AI Providers**\n\n` +
        `When you use AI-powered features, your inputs and related context may be transmitted to the following third-party AI service providers for processing: ${aiProviderList(d)}.\n\n` +
        `These providers process your data on our behalf under data processing agreements and their own privacy policies. ` +
        `We encourage you to review the privacy policies of each provider listed above.\n\n`
    }

    if (d.usesDataForTraining) {
      aiContent += `**AI Training Data**\n\nWe may use anonymized or aggregated data derived from user interactions to improve and fine-tune our AI models. `
      if (d.canOptOutTraining) {
        aiContent += `You may opt out of having your data used for AI training at any time by contacting us at ${d.contactEmail}. Opting out will not affect your access to the Service.`
      } else {
        aiContent += `This use is subject to applicable data protection laws. Where required by law, we will seek your consent before using your data for training purposes.`
      }
      aiContent += `\n\n`
    } else {
      aiContent +=
        `**No Training on Your Personal Data**\n\n` +
        `We do not use your personal data to train, fine-tune, or improve AI models. ` +
        `Data processed through AI features is used solely to generate the requested output and is not retained for training purposes.\n\n`
    }

    if (d.aiAutomatedDecisions) {
      aiContent +=
        `**Automated Decision-Making**\n\n` +
        `${d.appName} may use AI to make automated decisions that affect your experience or access to certain features. ` +
        `You have the right to request human review of any automated decision that significantly affects you. ` +
        `To exercise this right, contact us at ${d.contactEmail}.`
    }

    sections.push({ id: 'ai', title: 'Artificial Intelligence Processing', content: aiContent })
  }

  // 4. EU AI Act (conditional)
  if (d.needsEuAiAct) {
    sections.push({
      id: 'euai',
      title: 'EU AI Act Compliance',
      content:
        `In accordance with the EU Artificial Intelligence Act (EU AI Act), ${d.appName} provides the following transparency disclosures:\n\n` +
        `• **AI Transparency**: We clearly disclose when users are interacting with AI-generated content or AI-assisted functionality.\n` +
        `• **Human Oversight**: We maintain appropriate human oversight mechanisms for our AI systems, particularly where outputs may significantly affect users.\n` +
        `• **Accuracy Limitations**: Our AI systems may produce outputs that are inaccurate, incomplete, or inappropriate for your specific situation. AI-generated content should not be relied upon as professional, legal, medical, or financial advice.\n` +
        `• **Right to Explanation**: Where we use AI for decisions that significantly affect you, you have the right to request meaningful information about the logic involved and to seek human review.\n` +
        `• **Data Minimization**: We apply data minimization principles to AI processing, using only data necessary to deliver the requested AI functionality.\n\n` +
        `For questions about our AI systems or to exercise your rights under the EU AI Act, contact us at ${d.contactEmail}.`,
    })
  }

  // 5. Cookies (conditional)
  if (d.usesCookies) {
    sections.push({
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content:
        `We use cookies and similar tracking technologies to operate and improve ${d.appName}.\n\n` +
        `**Types of cookies we use:**\n\n` +
        `• **Strictly necessary cookies**: Required for basic site functionality and security. Cannot be disabled.\n` +
        `• **Analytics cookies**: Help us understand how visitors interact with the Service so we can improve it.\n` +
        `• **Preference cookies**: Remember your settings and personalization choices.\n` +
        `• **Marketing cookies**: Used to deliver relevant advertisements (only if applicable).\n\n` +
        `You can control and manage cookies through your browser settings. Disabling certain cookies may affect the functionality of the Service. ` +
        `Where required by law, we will obtain your consent before placing non-essential cookies.`,
    })
  }

  // 6. Data Sharing
  let sharingContent =
    `We do not sell your personal information. We may share your information only in the following circumstances:\n\n` +
    `• **Service providers**: Trusted vendors who perform services on our behalf (cloud hosting, payment processing, analytics, customer support), bound by confidentiality obligations\n`
  if (d.usesAI && d.userDataSentToAI) {
    sharingContent += `• **AI providers**: As described in the Artificial Intelligence Processing section above\n`
  }
  sharingContent +=
    `• **Legal compliance**: When required by law, court order, or government authority, or to protect the rights and safety of ${d.companyName}, our users, or the public\n` +
    `• **Business transfers**: In connection with a merger, acquisition, financing, or sale of all or a portion of our assets\n` +
    `• **With your consent**: For any other purpose disclosed to you with your prior consent`
  sections.push({ id: 'sharing', title: 'How We Share Your Information', content: sharingContent })

  // 7. Data Security
  sections.push({
    id: 'security',
    title: 'Data Security',
    content:
      `We implement appropriate technical and organizational security measures designed to protect your information against unauthorized access, alteration, disclosure, or destruction. ` +
      `These measures include encryption in transit, access controls, and regular security assessments.\n\n` +
      `However, no method of transmission over the Internet or electronic storage is 100% secure. ` +
      `We cannot guarantee absolute security and encourage you to use strong, unique passwords and to contact us immediately at ${d.contactEmail} if you suspect unauthorized access to your account.`,
  })

  // 8. Data Retention
  sections.push({
    id: 'retention',
    title: 'Data Retention',
    content:
      `We retain your personal information for as long as your account is active or as needed to provide you with the Service, comply with legal obligations, resolve disputes, and enforce our agreements.\n\n` +
      `Upon account deletion or upon request, we will delete or anonymize your personal information within 30 days, except where we are required to retain certain information by law or for legitimate business purposes such as fraud prevention.`,
  })

  // 9. Your Rights
  let rightsContent =
    `Depending on your location, you may have the following rights with respect to your personal information:\n\n` +
    `• **Access**: Request a copy of the personal information we hold about you\n` +
    `• **Correction**: Request correction of inaccurate or incomplete information\n` +
    `• **Deletion**: Request deletion of your personal information ("right to be forgotten")\n` +
    `• **Portability**: Receive your personal information in a structured, machine-readable format\n` +
    `• **Restriction**: Request that we restrict processing of your information in certain circumstances\n` +
    `• **Objection**: Object to processing based on legitimate interests or for direct marketing\n\n`

  if (d.servesEU || d.servesUK) {
    rightsContent +=
      `**EU/UK Residents (GDPR / UK GDPR)**\n\n` +
      `If you are located in the European Economic Area or United Kingdom, the above rights apply to you under the GDPR and UK GDPR. ` +
      `Our legal bases for processing your data include: performance of a contract, compliance with legal obligations, our legitimate interests (which we balance against your rights), and where required, your consent.\n\n` +
      `You also have the right to lodge a complaint with your local data protection authority.\n\n`
  }

  if (d.servesUS || d.servesCA) {
    rightsContent +=
      `**California Residents (CCPA / CPRA)**\n\n` +
      `California residents have the right to know what personal information we collect and how it is used, the right to delete personal information, ` +
      `the right to correct inaccurate information, the right to opt-out of the sale or sharing of personal information (we do not sell personal information), ` +
      `and the right to non-discrimination for exercising your privacy rights.\n\n`
  }

  rightsContent += `To exercise any of these rights, please contact us at ${d.contactEmail}. We will respond to verified requests within 30 days (or 45 days where permitted by law).`
  sections.push({ id: 'rights', title: 'Your Privacy Rights', content: rightsContent })

  // 10. Children's Privacy
  sections.push({
    id: 'children',
    title: "Children's Privacy",
    content: d.collectsChildrenData
      ? `${d.appName} may collect personal information from users under 13 only with verifiable parental consent, in compliance with the Children's Online Privacy Protection Act (COPPA) and applicable laws. ` +
        `Parents and guardians may review, correct, or request deletion of their child's information by contacting ${d.contactEmail}.`
      : `${d.appName} is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. ` +
        `If we learn that we have collected personal information from a child under 13 without parental consent, we will promptly delete that information. ` +
        `If you believe we have inadvertently collected information from a child under 13, please contact us at ${d.contactEmail}.`,
  })

  // 11. Changes
  sections.push({
    id: 'changes',
    title: 'Changes to This Privacy Policy',
    content:
      `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. ` +
      `We will notify you of material changes by posting the updated policy on this page and updating the "Last Updated" date. ` +
      `Where required by law, we will provide more prominent notice or obtain your consent. ` +
      `Your continued use of ${d.appName} after changes take effect constitutes your acceptance of the revised Privacy Policy.`,
  })

  // 12. Contact
  sections.push({
    id: 'contact',
    title: 'Contact Us',
    content:
      `If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:\n\n` +
      `${d.companyName}\n` +
      `Email: ${d.contactEmail}\n` +
      `Website: ${d.websiteUrl}`,
  })

  return {
    title: `Privacy Policy for ${d.appName}`,
    intro:
      `This Privacy Policy describes how ${d.companyName} ("we," "us," or "our") collects, uses, and shares information about you when you use ${d.appName} (the "Service"). ` +
      `By using the Service, you agree to the collection and use of information in accordance with this policy.`,
    sections,
    lastUpdated: formatDate(),
  }
}
