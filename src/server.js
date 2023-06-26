require("express-async-errors"); // esta importação precisa ser feita no início de tudo
require("dotenv/config"); // para lidar com dados sensíveis

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors"); // para conectar o front com o back-end
// cors: Cross-origin resource sharing ou compartilhamento de recursos com origens diferentes
const express = require("express"); // importando o express
const routes = require("./routes");
// não é necessário colocar "./routes/index.js" pois, por padrão, quando não é informado o nome do arquivo que deseja acessar da pasta, carrega o arquivo index

migrationsRun(); // executando o banco de dados, tabelas.

const app = express(); // inicializando o express
app.use(cors()); // habilitar para que o back-end consiga atender as requisições do front-end
app.use(express.json()); // informando ao node que o conteúdo vindo pelo corpo da requisição é no formato JSON

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); // static para servir arquivos estáticos

app.use(routes);

// Tratar exceções para quando a aplicação der um erro identificar de onde está vindo (client ou server)
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    // erro padrão (erro do servidor)
    status: "error",
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3333; // informando a porta que o express deve atender as solicitações
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // passando a função que será executada quando a aplicação iniciar
