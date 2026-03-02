import { ListLikesByPostUseCase } from '../likes/list-likes-by-post.js'

export function makeListLikesByPostUseCase() {
  return new ListLikesByPostUseCase()
}