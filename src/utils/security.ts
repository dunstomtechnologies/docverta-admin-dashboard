/**
 * Docverta Security Utilities
 * Enforces healthcare data protection, masking, and permission constraints.
 */

export function maskAadhaar(aadhaar: string): string {
  if (!aadhaar) return '•••• •••• ••••';
  const clean = aadhaar.replace(/\s+/g, '');
  if (clean.length < 4) return '•••• •••• ••••';
  const last4 = clean.slice(-4);
  return `•••• •••• ${last4}`;
}

export function maskPhoneNumber(phone: string): string {
  if (!phone) return '•••••••000';
  const clean = phone.replace(/[^\d+]/g, '');
  if (clean.length < 4) return clean;
  return clean.slice(0, 3) + '••••' + clean.slice(-3);
}

export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [user, domain] = email.split('@');
  if (!user || user.length <= 2) return `*@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

export type UserRole = 'super_admin' | 'admin' | 'auditor';

export interface AdminPermissions {
  canVerifyDoctors: boolean;
  canManageUsers: boolean;
  canManageContent: boolean;
  canViewReports: boolean;
  canModifySystemSettings: boolean;
  canExportPatientData: boolean; // restricted
}

export function getRolePermissions(role: UserRole): AdminPermissions {
  switch (role) {
    case 'super_admin':
      return {
        canVerifyDoctors: true,
        canManageUsers: true,
        canManageContent: true,
        canViewReports: true,
        canModifySystemSettings: true,
        canExportPatientData: true,
      };
    case 'admin':
      return {
        canVerifyDoctors: true,
        canManageUsers: true,
        canManageContent: true,
        canViewReports: true,
        canModifySystemSettings: false,
        canExportPatientData: false,
      };
    case 'auditor':
      return {
        canVerifyDoctors: false,
        canManageUsers: false,
        canManageContent: false,
        canViewReports: true,
        canModifySystemSettings: false,
        canExportPatientData: false,
      };
    default:
      return {
        canVerifyDoctors: false,
        canManageUsers: false,
        canManageContent: false,
        canViewReports: false,
        canModifySystemSettings: false,
        canExportPatientData: false,
      };
  }
}
