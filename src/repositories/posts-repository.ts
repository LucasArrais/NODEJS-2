import type { Prisma, Post } from "@/@types/prisma/client.js";

export interface PostsRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>
  list(): Promise<Post[]>
  findByPublicId(publicId: string): Promise<any>
  findManyByUserId(userId: number): Promise<Post[]>
  update(publicId: string, data: Prisma.PostUpdateInput): Promise<Post>
  delete(publicId: string): Promise<void>
}