import { SendRecoverPasswordUseCase } from '../users/send-recover-password.js'

export function makeSendRecoverPasswordUseCase() {
  return new SendRecoverPasswordUseCase()
}