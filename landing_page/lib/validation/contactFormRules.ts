export const CONTACT_FORM_LIMITS = {
    name: { min: 1, max: 100 },
    email: { max: 254 },
    businessName: { max: 150 },
    message: { min: 1, max: 2000 },
    service: { min: 1, max: 100 },
  } as const;
  
  export const NAME_PATTERN = /^[a-zA-Z\s'-]+$/;
  export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const dangerousContentPattern =
    /(<\s*script|javascript:|on\w+\s*=|<\/?[a-z][\s\S]*>)/i;
  
  export function containsUnsafeContent(value: string): boolean {
    return dangerousContentPattern.test(value) || value.includes("\0");
  }
  