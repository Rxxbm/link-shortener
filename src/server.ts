import app from "./express";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("O servidor está rodando na porta " + PORT);
});
