import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const port = 3000;

//* biblioteca para o gerenciamento de rotas HTTP
const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(usersRoute);
app.use(statusRoute);

// handeling de erro
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API executando na porta ${port}!`);
});
