import { Link } from "../domain/link";
import { ILinkRepository } from "../infra/link.repository";
import { GetShorterLinkerUseCase } from "./get-shorter-linker";

export class CreateShorterLinkUsecase {
  constructor(
    private readonly linkRepository: ILinkRepository,
    private readonly getShorterUrl: GetShorterLinkerUseCase
  ) {}

  async execute(url: string, shortUrl: string): Promise<string> {
    const link = new Link({ url, shortUrl });
    if (await this.getShorterUrl.execute(shortUrl)) {
      throw new Error("Short URL already exists");
    }
    await this.linkRepository.save(link);
    return shortUrl;
  }
}
