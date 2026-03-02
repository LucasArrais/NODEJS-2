import { GetCommentUseCase } from '../comments/get-comment.js'

export function makeGetCommentUseCase() {
  return new GetCommentUseCase()
}