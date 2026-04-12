import { ResetPasswordUseCase } from '../users/reset-password.js'

export function makeResetPasswordUseCase() {
  return new ResetPasswordUseCase()
}