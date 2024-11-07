import { Router } from "express";
import { salvarLogin, buscarLoginPorUsuario, removerLogin } from "../repository/LoginRepository.js";

const router = Router();

router.post('/login', async (req, resp) => {
  const login = req.body;
  const novoLogin = await salvarLogin(login);
  resp.send(novoLogin);
});

router.get('/login/:usuario', async (req, resp) => {
  const usuario = req.params.usuario;
  const login = await buscarLoginPorUsuario(usuario);
  resp.send(login);
});

router.delete('/login/:id', async (req, resp) => {
  const id = req.params.id;
  const resultado = await removerLogin(id);
  resp.status(resultado ? 202 : 404).send();
});

export default router;
