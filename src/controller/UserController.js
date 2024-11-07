import { Router } from "express";
import { salvarUsuario, listarUsuarios, buscarUsuarioPorId } from "../repository/UserRepository.js";

const router = Router();

router.post('/usuario', async (req, resp) => {
  const usuario = req.body;
  const novoUsuario = await salvarUsuario(usuario);
  resp.send(novoUsuario);
});

router.get('/usuario', async (req, resp) => {
  const usuarios = await listarUsuarios();
  resp.send(usuarios);
});

router.get('/usuario/:id', async (req, resp) => {
  const id = req.params.id;
  const usuario = await buscarUsuarioPorId(id);
  resp.send(usuario);
});

export default router;
