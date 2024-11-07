import { Router } from "express";
import { salvarUsuario, listarUsuarios, buscarUsuarioPorId } from "../repository/UserRepository.js";

const router = Router();

router.post('/usuario', async (req, resp) => {
  try {
    const usuario = req.body;
    const novoUsuario = await salvarUsuario(usuario);
    resp.status(201).send(novoUsuario);  
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
    resp.status(500).send({ message: "Erro ao salvar usuário. Tente novamente mais tarde." });
  }
});

router.get('/usuario', async (req, resp) => {
  try {
    const usuarios = await listarUsuarios();
    resp.status(200).send(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    resp.status(500).send({ message: "Erro ao listar usuários. Tente novamente mais tarde." });
  }
});

router.get('/usuario/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const usuario = await buscarUsuarioPorId(id);

    if (usuario) {
      resp.status(200).send(usuario);
    } else {
      resp.status(404).send({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    resp.status(500).send({ message: "Erro ao buscar usuário. Tente novamente mais tarde." });
  }
});

export default router;
