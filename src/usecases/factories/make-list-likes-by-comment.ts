import { ListLikesByCommentUseCase } from '../likes/list-likes-by-comment.js'

export function makeListLikesByCommentUseCase() {
  return new ListLikesByCommentUseCase()
}