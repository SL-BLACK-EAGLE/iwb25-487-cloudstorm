import { ZodError, ZodSchema } from 'zod';

export const validateForm = <T>(schema: ZodSchema<T>, data: unknown): {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
  data?: T;
} => {
  try {
    const validatedData = schema.parse(data);
    return {
      isValid: true,
      errors: {},
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Partial<Record<keyof T, string>> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof T] = err.message;
        }
      });
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: {},
    };
  }
};
