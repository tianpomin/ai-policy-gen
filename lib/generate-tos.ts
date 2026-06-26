import { PolicyFormData } from './types'
import { DocSection, GeneratedDoc } from './generate-privacy'

export function generateTermsOfService(d: PolicyFormData): GeneratedDoc {
  const sections: DocSection[] = []
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // 1. Acceptance
  sections.push({
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content:
      `By accessing or using ${d.appName} (the "Service"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy, which is incorporated herein by reference. ` +
      `If you do not agree to these Terms, you may not access or use the Service.\n\n` +
      `${d.companyName} ("we," "us," or "our") reserves the right to modify these Terms at any time. ` +
      `We will provide notice of material changes via email or a prominent notice on the Service. ` +
      `Your continued use of the Service after any modification constitutes your acceptance of the updated Terms.`,
  })

  // 2. Description of Service
  sections.push({
    id: 'service',
    title: 'Description of Service',
    content:
      `${d.appName} is a software service provided by ${d.companyName} and accessible at ${d.websiteUrl}. ` +
      `We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. ` +
      `We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.`,
  })

  // 3. Accounts
  sections.push({
    id: 'accounts',
    title: 'User Accounts',
    content:
      `To access certain features of the Service, you may be required to create an account. You agree to:\n\n` +
      `• Provide accurate, current, and complete information during registration\n` +
      `• Maintain and promptly update your account information\n` +
      `• Maintain the security of your password and restrict access to your account\n` +
      `• Accept responsibility for all activities that occur under your account\n` +
      `• Notify us immediately at ${d.contactEmail} if you suspect unauthorized use of your account\n\n` +
      `We reserve the right to terminate accounts that violate these Terms or that have been inactive for an extended period.`,
  })

  // 4. AI Features (conditional)
  if (d.usesAI) {
    let aiContent =
      `${d.appName} incorporates artificial intelligence ("AI") features. By using these features, you acknowledge and agree to the following:\n\n`

    aiContent +=
      `**Accuracy and Reliability**\n\n` +
      `AI-generated content and outputs may be inaccurate, incomplete, outdated, biased, or unsuitable for your specific circumstances. ` +
      `AI outputs do not constitute professional advice of any kind—including legal, medical, financial, or technical advice. ` +
      `You are solely responsible for independently evaluating and verifying any AI-generated content before acting on it.\n\n`

    if (d.aiContentOwnership === 'user') {
      aiContent +=
        `**Ownership of AI Outputs**\n\n` +
        `You retain ownership of the content you input into AI features ("Input"). ` +
        `AI-generated outputs produced from your Input ("Output") are assigned to you to the extent permitted by the underlying AI provider's terms. ` +
        `You grant ${d.companyName} a limited license to process your Input solely to provide the Service.\n\n`
    } else if (d.aiContentOwnership === 'company') {
      aiContent +=
        `**Ownership of AI Outputs**\n\n` +
        `You retain ownership of content you input into AI features. ` +
        `AI-generated outputs are owned by ${d.companyName} and are licensed to you for personal, non-commercial use under a non-exclusive, non-transferable license, unless a separate written agreement provides otherwise.\n\n`
    } else {
      aiContent +=
        `**Ownership of AI Outputs**\n\n` +
        `You retain ownership of content you input into AI features. ` +
        `AI-generated outputs may be used by you for personal and commercial purposes. ` +
        `${d.companyName} retains the right to use anonymized outputs to improve the Service.\n\n`
    }

    if (d.userDataSentToAI) {
      aiContent +=
        `**Third-Party AI Processing**\n\n` +
        `Certain AI features require your inputs to be transmitted to third-party AI providers for processing. ` +
        `By using these features, you consent to such transmission as described in our Privacy Policy. ` +
        `You agree not to input sensitive personal information (such as financial data, health records, or government ID numbers) into AI features unless explicitly instructed otherwise.\n\n`
    }

    aiContent +=
      `**Prohibited AI Uses**\n\n` +
      `You may not use AI features to:\n\n` +
      `• Generate content that is illegal, harmful, threatening, abusive, defamatory, or violates third-party rights\n` +
      `• Infringe any patent, trademark, copyright, trade secret, or other proprietary rights\n` +
      `• Create spam, phishing content, or deceptive material\n` +
      `• Impersonate any person or entity, or misrepresent your affiliation with any person or entity\n` +
      `• Generate or disseminate misinformation or disinformation\n` +
      `• Violate any applicable laws or regulations, including export control laws`

    sections.push({ id: 'ai', title: 'AI Features and Limitations', content: aiContent })
  }

  // 5. Acceptable Use
  sections.push({
    id: 'aup',
    title: 'Acceptable Use',
    content:
      `You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:\n\n` +
      `• Violate any applicable local, national, or international law or regulation\n` +
      `• Transmit any unsolicited or unauthorized advertising or promotional material\n` +
      `• Transmit any malware, viruses, or other malicious code\n` +
      `• Attempt to gain unauthorized access to the Service, servers, or networks\n` +
      `• Use the Service to scrape, crawl, or harvest data without our written permission\n` +
      `• Interfere with or disrupt the integrity or performance of the Service\n` +
      `• Reverse engineer, decompile, or disassemble any part of the Service\n` +
      `• Use the Service in any way that could damage our reputation or goodwill`,
  })

  // 6. Payment Terms (conditional)
  if (d.hasPaidPlan) {
    let paymentContent =
      `**Subscriptions and Fees**\n\n` +
      `Certain features of ${d.appName} require a paid subscription. By subscribing, you authorize us to charge you the applicable fees on a recurring basis. ` +
      `All fees are stated in USD and are exclusive of taxes unless otherwise noted.\n\n` +
      `**Automatic Renewal**\n\n` +
      `Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date. ` +
      `You may cancel your subscription at any time through your account settings or by contacting ${d.contactEmail}. ` +
      `Cancellation takes effect at the end of the current billing period.\n\n`

    if (d.hasRefundPolicy) {
      paymentContent +=
        `**Refund Policy**\n\n` +
        `We offer a ${d.refundDays}-day money-back guarantee. If you are not satisfied with the Service, contact us at ${d.contactEmail} within ${d.refundDays} days of your initial purchase or renewal, and we will issue a full refund. ` +
        `Refunds are processed within 5–10 business days.`
    } else {
      paymentContent +=
        `**No Refunds**\n\n` +
        `All fees are non-refundable except as required by applicable law or as otherwise expressly stated in writing by ${d.companyName}.`
    }

    sections.push({ id: 'payment', title: 'Payment Terms', content: paymentContent })
  }

  // 7. User-Generated Content (conditional)
  if (d.hasUGC) {
    sections.push({
      id: 'ugc',
      title: 'User-Generated Content',
      content:
        `**License Grant**\n\n` +
        `By submitting, posting, or displaying content on or through the Service ("User Content"), you grant ${d.companyName} a worldwide, non-exclusive, royalty-free, sublicensable license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content in connection with operating and improving the Service.\n\n` +
        `**Your Representations**\n\n` +
        `You represent and warrant that: (i) you own or have the necessary rights to your User Content; (ii) your User Content does not infringe any third-party intellectual property rights, privacy rights, or other rights; and (iii) your User Content complies with these Terms and applicable law.\n\n` +
        `**Content Removal**\n\n` +
        `We reserve the right to remove or disable any User Content that, in our sole judgment, violates these Terms or is otherwise objectionable. We do not assume any obligation to monitor User Content.`,
    })
  }

  // 8. Intellectual Property
  sections.push({
    id: 'ip',
    title: 'Intellectual Property',
    content:
      `The Service and its original content, features, and functionality—including but not limited to software, text, graphics, logos, and trademarks—are and will remain the exclusive property of ${d.companyName} and its licensors, protected by copyright, trademark, and other intellectual property laws.\n\n` +
      `You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your internal business or personal purposes, subject to these Terms. ` +
      `You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any material from the Service without our prior written consent.\n\n` +
      `Any feedback, suggestions, or ideas you provide regarding the Service may be used by ${d.companyName} without any obligation to compensate you.`,
  })

  // 9. Disclaimer of Warranties
  sections.push({
    id: 'disclaimer',
    title: 'Disclaimer of Warranties',
    content:
      `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.\n\n` +
      `${d.companyName.toUpperCase()} DOES NOT WARRANT THAT: (I) THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; ` +
      `(II) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (III) THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (IV) THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.`,
  })

  // 10. Limitation of Liability
  sections.push({
    id: 'liability',
    title: 'Limitation of Liability',
    content:
      `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${d.companyName.toUpperCase()}, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, ` +
      `INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:\n\n` +
      `(I) YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE;\n` +
      `(II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE;\n` +
      `(III) ANY CONTENT OBTAINED FROM THE SERVICE; OR\n` +
      `(IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.\n\n` +
      `OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) $100 USD OR (B) THE TOTAL AMOUNT YOU PAID ${d.companyName.toUpperCase()} IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.`,
  })

  // 11. Indemnification
  sections.push({
    id: 'indemnification',
    title: 'Indemnification',
    content:
      `You agree to defend, indemnify, and hold harmless ${d.companyName} and its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, and fees (including reasonable attorneys' fees) ` +
      `arising out of or relating to your violation of these Terms or your use of the Service, including but not limited to any User Content you submit, any use of the Service's content other than as expressly authorized, or your violation of any law or the rights of any third party.`,
  })

  // 12. Governing Law
  const jurisdiction = d.country || (d.servesEU ? 'the European Union' : 'the State of Delaware, United States')
  sections.push({
    id: 'law',
    title: 'Governing Law and Dispute Resolution',
    content:
      `These Terms shall be governed by and construed in accordance with the laws of ${jurisdiction}, without regard to its conflict of law provisions.\n\n` +
      `Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. ` +
      `If negotiation fails, disputes shall be resolved by binding arbitration or in the courts of competent jurisdiction in ${jurisdiction}, ` +
      `and you consent to the personal jurisdiction of such courts.`,
  })

  // 13. General Provisions
  sections.push({
    id: 'general',
    title: 'General Provisions',
    content:
      `**Entire Agreement**: These Terms, together with our Privacy Policy, constitute the entire agreement between you and ${d.companyName} regarding the Service.\n\n` +
      `**Severability**: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.\n\n` +
      `**Waiver**: Our failure to enforce any provision of these Terms shall not be deemed a waiver of our right to enforce it in the future.\n\n` +
      `**Assignment**: You may not assign these Terms or any rights hereunder without our prior written consent. We may assign these Terms without restriction.`,
  })

  // 14. Contact
  sections.push({
    id: 'contact',
    title: 'Contact',
    content:
      `For questions about these Terms of Service, please contact:\n\n` +
      `${d.companyName}\n` +
      `Email: ${d.contactEmail}\n` +
      `Website: ${d.websiteUrl}`,
  })

  return {
    title: `Terms of Service for ${d.appName}`,
    intro:
      `These Terms of Service ("Terms") govern your access to and use of ${d.appName} provided by ${d.companyName}. ` +
      `Please read these Terms carefully before using the Service. ` +
      `By accessing or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms.`,
    sections,
    lastUpdated,
  }
}
