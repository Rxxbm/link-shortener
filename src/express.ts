import express, { json } from "express";
import { CreateShorterLinkUsecase } from "./link-shortener/use-case/create-shorter-link";
import { LinkRepository } from "./link-shortener/infra/link.repository";
import { GetShorterLinkerUseCase } from "./link-shortener/use-case/get-shorter-linker";
import { LinkMongoRepository } from "./link-shortener/infra/mongodb/link-mongo.repository";

const app = express();

const repo = new LinkMongoRepository();
const getLink = new GetShorterLinkerUseCase(repo);
const createLink = new CreateShorterLinkUsecase(repo, getLink);

app.use(json());

app.post("/link", async (req, res) => {
  const { url, shortUrl } = req.body;
  try {
    await createLink.execute(url, shortUrl);
    res.json({ message: "link registrado com sucesso!" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const link = await getLink.execute(shortUrl);
  if (!link?.url || !link?.shortUrl) {
    res.status(404).json({ message: "link não encontrado" });
  } else {
    res.redirect(link?.url as string);
  }
});

app.get("/", async (req, res) => {
  res.json(await repo.list());
});
export default app;
