import express, { Request, Response, NextFunction } from "express";

const port = 3000;

//* biblioteca para o gerenciamento de rotas HTTP
const app = express();

app.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: "bar" });
});

app.listen(port, () => {
  console.log(`API executando na porta ${port}`);
});
