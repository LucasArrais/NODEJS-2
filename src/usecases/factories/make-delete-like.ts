import { DeleteLikeUseCase } from '../likes/delete-like.js'

export function makeDeleteLikeUseCase() {
  return new DeleteLikeUseCase()
}