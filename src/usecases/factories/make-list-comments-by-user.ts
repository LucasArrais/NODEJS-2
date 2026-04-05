import { ListCommentsByUserUseCase } from '../comments/list-comments-by-user.js'

export function makeListCommentsByUserUseCase() {
  return new ListCommentsByUserUseCase()
}
