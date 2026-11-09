import { describe, it, expect } from 'vitest';
import { maskAadhaar, maskPhoneNumber, maskEmail, getRolePermissions } from '../security';

describe('Security & Healthcare PII Protection', () => {
  it('should mask Aadhaar numbers keeping only last 4 digits visible', () => {
    expect(maskAadhaar('1234 5678 9012')).toBe('•••• •••• 9012');
    expect(maskAadhaar('987654321098')).toBe('•••• •••• 1098');
    expect(maskAadhaar('')).toBe('•••• •••• ••••');
  });

  it('should mask phone numbers for protected patient records', () => {
    const masked = maskPhoneNumber('+919876543210');
    expect(masked).toContain('••••');
  });

  it('should mask email addresses', () => {
    const masked = maskEmail('patient@healthcare.com');
    expect(masked).toBe('p***t@healthcare.com');
  });

  it('should enforce distinct RBAC permissions between Super Admin and Auditor', () => {
    const superAdmin = getRolePermissions('super_admin');
    const auditor = getRolePermissions('auditor');

    expect(superAdmin.canVerifyDoctors).toBe(true);
    expect(superAdmin.canModifySystemSettings).toBe(true);

    expect(auditor.canVerifyDoctors).toBe(false);
    expect(auditor.canModifySystemSettings).toBe(false);
    expect(auditor.canViewReports).toBe(true);
  });
});
