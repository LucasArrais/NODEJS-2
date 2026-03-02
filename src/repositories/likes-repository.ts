import type { Prisma, Like } from '@/@types/prisma/client.js'

export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>

  findByPublicId(publicId: string): Promise<Like | null>

  findByUserAndTarget(
    userId: number,
    postId?: number,
    commentId?: number
  ): Promise<Like | null>

  listByUser(userId: number): Promise<Like[]>

  listByPost(postId: number): Promise<Like[]>

  listByComment(commentId: number): Promise<Like[]>

  delete(publicId: string): Promise<void>
}