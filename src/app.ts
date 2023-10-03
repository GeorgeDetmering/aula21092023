import express from "express";
import { atualizarUsuario, cadastrarUsuario, listarUsuarios, deletarUsuario } from "./controlers/user";

const app = express();

app.use(express.json());

//Rotas
app.post('./users', cadastrarUsuario);
app.get('./users', listarUsuarios);
app.patch('./users/:user_id', atualizarUsuario);
app.delete('./users/:user_id', deletarUsuario);

export default app;