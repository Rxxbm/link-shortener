import { ILinkRepository } from "../infra/link.repository";

export class GetShorterLinkerUseCase {
  constructor(private readonly linkRepository: ILinkRepository) {}

  async execute(shortUrl: string) {
    const link = await this.linkRepository.findByShortUrl(shortUrl);
    return link;
  }
}
