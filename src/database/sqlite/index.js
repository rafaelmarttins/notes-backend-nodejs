const sqlite3 = require("sqlite3"); // drive que estabelece a conexão com a base de dados
const sqlite = require("sqlite"); // responsável por conectar
const path = require("path"); // resolve os endereços de acordo com o ambiente

async function sqliteConnection() {
  // abrir conexão
  const database = await sqlite.open({
    // passar um objeto com configurações da conexão (onde salvar o arquivo no banco de dados)
    // filename: "../../database" // pode dar problema ao rodar a API em outro sistema operacional
    filename: path.resolve(__dirname, "..", "database.db"), // __dirname pega de forma automática onde está dentro do projeto
    // ".." para voltar uma pasta para trás
    // "database.db" cria um arquivo database.db dentro da pasta database
    driver: sqlite3.Database, // informando o drive de conexão a ser utilizado
  });

  return database;
}

module.exports = sqliteConnection;
