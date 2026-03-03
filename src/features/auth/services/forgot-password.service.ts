import { request } from "@/shared/lib/api"

export interface ForgotPasswordEmailDTO {
  email: string
}

export interface ForgotPasswordCodeDTO {
  email: string
  codigo: string
}

export interface ForgotPasswordResetDTO {
  email: string
  codigo: string
  password: string
}

export interface CheckEmailResponse {
  ok: boolean
  correo_estado: boolean
  correo: string
  codigo: string
  mensaje: string
}

export interface VerifyCodeResponse {
  ok: boolean
  correo: string
  codigo: string
  mensaje: string
}

export const forgotPasswordService = {
  sendEmail(data: ForgotPasswordEmailDTO) {
    return request<CheckEmailResponse>({
      route: "/WClComprobarCorreo",
      method: "POST",
      data,
    })
  },

  verifyCode(data: ForgotPasswordCodeDTO) {
    return request<VerifyCodeResponse>({
      route: "/WSgVerificarCodigo",
      method: "POST",
      data,
    })
  },

  resetPassword(data: ForgotPasswordResetDTO) {
    return request<void>({
      route: "/WSgCambioContra",
      method: "POST",
      data,
    })
  },
}