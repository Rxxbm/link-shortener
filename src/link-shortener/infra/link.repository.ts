import { Link } from "../domain/link";

export interface ILinkRepository {
  save(link: Link): Promise<void>;
  findByShortUrl(shortUrl: string): Promise<Link | undefined>;
  list(): Promise<any>;
}

export class LinkRepository implements ILinkRepository {
  private readonly _Links: Link[] = [];

  async save(link: Link): Promise<void> {
    this._Links.push(link);
  }

  async findByShortUrl(shortUrl: string): Promise<Link | undefined> {
    return this._Links.find((Link) => Link.shortUrl === shortUrl);
  }

  async list() {}
}
