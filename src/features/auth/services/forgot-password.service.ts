import { request } from "@/shared/lib/api"

export interface ForgotPasswordEmailDTO {
  email: string
}

export interface ForgotPasswordCodeDTO {
  email: string
  code: string
}

export interface ForgotPasswordResetDTO {
  email: string
  code: string
  newPassword: string
}

export const forgotPasswordService = {
  sendEmail(data: ForgotPasswordEmailDTO) {
    return request<void>({
      route: "/auth/forgot-password",
      method: "POST",
      data,
    })
  },

  verifyCode(data: ForgotPasswordCodeDTO) {
    return request<void>({
      route: "/auth/forgot-password/verify",
      method: "POST",
      data,
    })
  },

  resetPassword(data: ForgotPasswordResetDTO) {
    return request<void>({
      route: "/auth/forgot-password/reset",
      method: "POST",
      data,
    })
  },
}
