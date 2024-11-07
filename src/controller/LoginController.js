import { Router } from "express";
import { salvarLogin, buscarLoginPorUsuario, removerLogin } from "../repository/LoginRepository.js";

const router = Router();

router.post('/login', async (req, resp) => {
  try {
    const login = req.body;
    const novoLogin = await salvarLogin(login);
    resp.status(201).send(novoLogin); 
  } catch (error) {
    console.error("Erro ao salvar login:", error);
    resp.status(500).send({ message: "Erro ao salvar login. Tente novamente mais tarde." });
  }
});

router.get('/login/:usuario', async (req, resp) => {
  try {
    const usuario = req.params.usuario;
    const login = await buscarLoginPorUsuario(usuario);
    
    if (login) {
      resp.status(200).send(login);
    } else {
      resp.status(404).send({ message: "Login não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar login:", error);
    resp.status(500).send({ message: "Erro ao buscar login. Tente novamente mais tarde." });
  }
});

router.delete('/login/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const resultado = await removerLogin(id);
    
    if (resultado) {
      resp.status(202).send({ message: "Login removido com sucesso." });
    } else {
      resp.status(404).send({ message: "Login não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao remover login:", error);
    resp.status(500).send({ message: "Erro ao remover login. Tente novamente mais tarde." });
  }
});

export default router;
