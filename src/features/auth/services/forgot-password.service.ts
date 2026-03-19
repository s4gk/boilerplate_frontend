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
  new_password: string
}

export interface CheckEmailResponse {
  verified: boolean
  correo_estado: boolean
  correo: string
  code: string
  mensaje: string
}

export interface VerifyCodeResponse {
  verified: boolean
  correo: string
  code: string
  mensaje: string
}

export const forgotPasswordService = {
  sendEmail(data: ForgotPasswordEmailDTO) {
    return request<CheckEmailResponse>({
      route: "/auth/forgot-password",
      method: "POST",
      data,
    })
  },

  verifyCode(data: ForgotPasswordCodeDTO) {
    return request<VerifyCodeResponse>({
      route: "/auth/verify-code",
      method: "POST",
      data,
    })
  },

  resetPassword(data: ForgotPasswordResetDTO) {
    return request<void>({
      route: "/auth/reset-password",
      method: "POST",
      data,
    })
  },
}