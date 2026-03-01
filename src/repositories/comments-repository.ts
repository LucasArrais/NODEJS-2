import type { Prisma, Comment } from '@/@types/prisma/client.js'

export interface CommentsRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>

  findByPublicId(publicId: string): Promise<Comment | null>

  findByPublicIdWithUser(
    publicId: string
  ): Promise<(Comment & { usuario: { public_id: string } }) | null>

  list(): Promise<Comment[]>

  listByUser(userId: number): Promise<Comment[]>

  listByPost(postId: number): Promise<Comment[]>

  update(
    publicId: string,
    data: Prisma.CommentUpdateInput
  ): Promise<Comment>

  delete(publicId: string): Promise<void>

  listWithRelations(
  page: number
  ): Promise<
  {
    public_id: string
    conteudo: string
    created_at: Date
    usuario: {
      public_id: string
      name: string
    }
    post: {
      public_id: string
    }
  }[]
>
}