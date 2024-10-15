import { randomUUID } from "node:crypto";

export type linkProps = {
  id?: string;
  url: string;
  shortUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Link {
  private _id: string;
  private _url: string;
  private _shortUrl: string;
  private _createdAt: Date;
  private _updatedAt: Date | undefined;

  constructor(props: linkProps) {
    this._id = props.id || randomUUID();
    this._url = props.url;
    this._shortUrl = props.shortUrl;
    this._createdAt = new Date();
    this._updatedAt = props.updatedAt;
  }

  get id() {
    return this._id;
  }

  get url() {
    return this._url;
  }

  get shortUrl() {
    return this._shortUrl;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  updateUrl(url: string) {
    this._url = url;
    this._updatedAt = new Date();
  }
}
