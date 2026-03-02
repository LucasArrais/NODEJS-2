import { GetLikeUseCase } from '../likes/get-like.js'

export function makeGetLikeUseCase() {
  return new GetLikeUseCase()
}