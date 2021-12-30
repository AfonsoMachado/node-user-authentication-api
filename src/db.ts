import { Pool } from "pg";

// LINK DE CONEXÃO DO ElephantSQL
// TODO Colocar senha em variável de ambiente
const connectionString =
  "postgres://uicnkwmx:RDBYk3_FAOBPg4i-WK6OzMhMITVw2oD6@tuffi.db.elephantsql.com/uicnkwmx";
const db = new Pool({ connectionString });

export default db;
