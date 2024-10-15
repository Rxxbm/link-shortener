import { Link } from "../../domain/link";
import { ILinkRepository } from "../link.repository";
import { mongoConnect } from "./config/mongo";
import { LinkModel } from "./model/link";

export class LinkMongoRepository implements ILinkRepository {
  constructor() {
    mongoConnect();
  }

  async save(link: Link): Promise<void> {
    await LinkModel.create({ original: link.url, short: link.shortUrl });
  }
  async findByShortUrl(shortUrl: string): Promise<Link | undefined> {
    const link = await LinkModel.findOne({
      $where: `this.short === '${shortUrl}'`,
    });
    const res = new Link({
      url: link?.original as string,
      shortUrl: link?.short as string,
    });
    return res;
  }
  async list() {
    const links = await LinkModel.find();
    return links;
  }
}
