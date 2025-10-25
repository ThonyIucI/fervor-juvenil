import { z } from 'zod'

import { VALIDATION_MESSAGES } from '@common/constants'
import { emailSchema, passwordSchema } from '@common/schemas/common.schema'

/**
 * Login Schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export type LoginInput = z.infer<typeof loginSchema>

/**
 * Register Schema
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, VALIDATION_MESSAGES.MIN_LENGTH(2))
      .max(50, VALIDATION_MESSAGES.MAX_LENGTH(50)),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword']
  })

export type RegisterInput = z.infer<typeof registerSchema>

/**
 * Forgot Password Schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

/**
 * Reset Password Schema
 */
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword']
  })

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

/**
 * Change Password Schema
 */
export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword']
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'La nueva contraseña debe ser diferente a la actual',
    path: ['newPassword']
  })

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
