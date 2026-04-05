import { ListLikesByUserUseCase } from '../likes/list-likes-by-user.js'

export function makeListLikesByUserUseCase() {
  return new ListLikesByUserUseCase()
}
