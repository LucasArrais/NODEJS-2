import { ListPostsByUserUseCase } from '../posts/list-posts-by-user.js'

export function makeListPostsByUserUseCase() {
  return new ListPostsByUserUseCase()
}