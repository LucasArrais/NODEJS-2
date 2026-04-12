import type { Prisma } from '@/@types/prisma/client.js'

export interface PostsRepository {
  create(data: Prisma.PostCreateInput): Promise<any>
  list(): Promise<any>
  findByPublicId(publicId: string): Promise<any>
  findManyByUserId(userId: number): Promise<any>
  update(publicId: string, data: Prisma.PostUpdateInput): Promise<any>
  delete(publicId: string): Promise<void>
  findTopLikedPostsInLast24Hours(): Promise<Array<{
    id: number
    public_id: string
    titulo: string
    conteudo: string
    created_at: Date
    usuario: {
      name: string
      email: string
    }
    _count: {
      likes: number
    }
  }>>
}