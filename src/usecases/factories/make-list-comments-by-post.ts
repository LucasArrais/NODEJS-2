import { ListCommentsByPostUseCase } from '../comments/list-comments-by-post.js'

export function makeListCommentsByPostUseCase() {
  return new ListCommentsByPostUseCase()
}
