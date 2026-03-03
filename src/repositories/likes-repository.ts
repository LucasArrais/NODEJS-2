import type { Prisma, Like } from "@/@types/prisma/client.js";

export interface FindByUserAndTargetParams {
  userId: number
  postId?: number | null
  commentId?: number | null
}

export interface LikesRepository {
  create(data: Prisma.LikeCreateInput): Promise<Like>
  findByUserAndTarget(params: FindByUserAndTargetParams): Promise<Like | null>
  findManyByPostId(postId: number): Promise<Like[]>
  findManyByCommentId(commentId: number): Promise<Like[]>
  findManyByUserId(userId: number): Promise<Like[]>
  delete(id: number): Promise<void>
  deleteByUserAndTarget(params: FindByUserAndTargetParams): Promise<void>
}