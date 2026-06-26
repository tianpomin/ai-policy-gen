export interface PolicyFormData {
  // Step 1: Basic Info
  companyName: string
  appName: string
  websiteUrl: string
  contactEmail: string
  country: string

  // Step 2: Data Collection
  collectsEmail: boolean
  collectsName: boolean
  collectsPayment: boolean
  collectsLocation: boolean
  collectsDeviceInfo: boolean
  collectsUsageData: boolean
  collectsUserContent: boolean
  usesCookies: boolean
  collectsChildrenData: boolean

  // Step 3: AI Features
  usesAI: boolean
  aiProviders: string[]
  aiProviderOther: string
  userDataSentToAI: boolean
  usesDataForTraining: boolean
  canOptOutTraining: boolean
  aiAutomatedDecisions: boolean
  aiContentOwnership: 'user' | 'company' | 'shared' | ''
  needsEuAiAct: boolean

  // Step 4: Compliance
  servesEU: boolean
  servesUS: boolean
  servesUK: boolean
  servesCA: boolean
  servesGlobal: boolean

  // Step 5: Business Model
  hasPaidPlan: boolean
  hasRefundPolicy: boolean
  refundDays: number
  hasUGC: boolean
  hasNewsletter: boolean
}

export const defaultFormData: PolicyFormData = {
  companyName: '',
  appName: '',
  websiteUrl: '',
  contactEmail: '',
  country: '',
  collectsEmail: false,
  collectsName: false,
  collectsPayment: false,
  collectsLocation: false,
  collectsDeviceInfo: false,
  collectsUsageData: false,
  collectsUserContent: false,
  usesCookies: false,
  collectsChildrenData: false,
  usesAI: false,
  aiProviders: [],
  aiProviderOther: '',
  userDataSentToAI: false,
  usesDataForTraining: false,
  canOptOutTraining: false,
  aiAutomatedDecisions: false,
  aiContentOwnership: '',
  needsEuAiAct: false,
  servesEU: false,
  servesUS: false,
  servesUK: false,
  servesCA: false,
  servesGlobal: false,
  hasPaidPlan: false,
  hasRefundPolicy: false,
  refundDays: 30,
  hasUGC: false,
  hasNewsletter: false,
}
