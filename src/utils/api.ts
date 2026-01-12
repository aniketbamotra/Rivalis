/**
 * API utilities for form submissions and backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Submit a form to the backend
 */
export const submitForm = async <T>(
  endpoint: string,
  formData: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

/**
 * Submit client intake form
 */
export const submitClientIntake = async (formData: {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  description: string;
  urgency: string;
}) => {
  return submitForm('/forms/client-intake', formData);
};

/**
 * Submit qualification form
 */
export const submitQualificationForm = async (formData: {
  companyName: string;
  industry: string;
  employeeCount?: string;
  annualRevenue?: string;
  legalNeeds: string;
  timeline?: string;
  budget?: string;
  referralSource?: string;
  additionalInfo?: string;
}) => {
  return submitForm('/forms/qualification', formData);
};

/**
 * Submit immigration intake form
 */
export const submitImmigrationIntake = async (formData: {
  fullName: string;
  email: string;
  phone: string;
  citizenship: string;
  currentStatus: string;
  visaType: string;
  employerName?: string;
  jobTitle?: string;
  urgency?: string;
  previousApplications?: string;
  additionalInfo?: string;
}) => {
  return submitForm('/forms/immigration-intake', formData);
};

/**
 * Submit AI governance intake form
 */
export const submitAIGovernanceIntake = async (formData: {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry: string;
  aiUseCases: string;
  dataTypes?: string;
  regulatoryRequirements?: string;
  existingPolicies?: string;
  timeline?: string;
  budget?: string;
  additionalInfo?: string;
}) => {
  return submitForm('/forms/ai-governance-intake', formData);
};

/**
 * Send contact email
 */
export const sendContactEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return submitForm('/contact', data);
};

/**
 * Subscribe to newsletter
 */
export const subscribeNewsletter = async (email: string) => {
  return submitForm('/newsletter/subscribe', { email });
};

