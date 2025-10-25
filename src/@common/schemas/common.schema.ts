import { z } from 'zod'

import { VALIDATION_MESSAGES } from '../constants'

/**
 * Common reusable Zod schemas
 */

// Email schema
export const emailSchema = z
  .string()
  .min(1, VALIDATION_MESSAGES.REQUIRED)
  .email(VALIDATION_MESSAGES.EMAIL)

// Password schema
export const passwordSchema = z
  .string()
  .min(8, VALIDATION_MESSAGES.MIN_LENGTH(8))
  .max(50, VALIDATION_MESSAGES.MAX_LENGTH(50))

// Strong password schema (with requirements)
export const strongPasswordSchema = z
  .string()
  .min(8, VALIDATION_MESSAGES.MIN_LENGTH(8))
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
  )

// Phone number schema (format: +51 999 999 999)
export const phoneSchema = z
  .string()
  .regex(/^\+?\d{1,3}?\s?\d{3}\s?\d{3}\s?\d{3}$/, 'Formato de teléfono inválido')
  .optional()

// URL schema
export const urlSchema = z.string().url('URL inválida').optional()

// Date string schema
export const dateStringSchema = z.string().refine((date) => !isNaN(Date.parse(date)), {
  message: 'Fecha inválida'
})

// Positive number schema
export const positiveNumberSchema = z.number().positive('Debe ser un número positivo')

// ID schema (for databases)
export const idSchema = z.union([z.string().uuid(), z.number().positive()])

// Pagination params schema
export const paginationSchema = z.object({
  page: z.number().positive().default(1),
  limit: z.number().positive().max(100).default(10)
})

// Search params schema
export const searchSchema = z.object({
  query: z.string().optional(),
  ...paginationSchema.shape
})

/**
 * Helper function to create enum schema from array
 */
export const createEnumSchema = <T extends readonly [string, ...string[]]>(values: T) => {
  return z.enum(values)
}

/**
 * Helper to make all fields optional (for PATCH requests)
 */
export const makeOptional = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  return schema.partial()
}
