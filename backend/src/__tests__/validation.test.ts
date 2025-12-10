// NOTE: This test file was added to demonstrate basic unit testing
// for the technical assignment. It covers Zod schema validation logic.

import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from '../validation/auth.validation';

describe('Authentication Validation Schemas', () => {
  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'securepassword123',
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'not-an-email',
        firstName: 'John',
        lastName: 'Doe',
        password: 'securepassword123',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Invalid email');
      }
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: '12345', // Only 5 characters
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 6 characters');
      }
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        email: 'user@example.com',
        // Missing firstName, lastName, password
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty first name', () => {
      const invalidData = {
        email: 'user@example.com',
        firstName: '',
        lastName: 'Doe',
        password: 'securepassword123',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'user@example.com',
        password: 'anypassword',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email in login', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'anypassword',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const invalidData = {
        email: 'user@example.com',
        password: '',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('updateProfileSchema', () => {
    it('should validate update with email only', () => {
      const validData = {
        email: 'newemail@example.com',
      };

      const result = updateProfileSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate update with firstName only', () => {
      const validData = {
        firstName: 'Jane',
      };

      const result = updateProfileSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate update with all fields', () => {
      const validData = {
        email: 'newemail@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const result = updateProfileSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject update with no fields provided', () => {
      const invalidData = {};

      const result = updateProfileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('At least one field');
      }
    });

    it('should reject invalid email in update', () => {
      const invalidData = {
        email: 'not-valid-email',
      };

      const result = updateProfileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

