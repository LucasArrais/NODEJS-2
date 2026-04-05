import type { CommentsRepository } from '@/repositories/comments-repository.js'

interface ListCommentsUseCaseRequest {
  page: number
}

interface ListCommentsUseCaseResponse {
  comments: {
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
}

export class ListCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    page,
  }: ListCommentsUseCaseRequest): Promise<ListCommentsUseCaseResponse> {
    const comments = await this.commentsRepository.listWithRelations(page)

    return {
      comments,
    }
  }
}
