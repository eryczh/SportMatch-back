import { Router } from "express";
import { salvarPartida, listarPartidas, buscarPartidaPorId } from "../repository/PartidaRepository.js";

const router = Router();

router.post('/partida', async (req, resp) => {
  try {
    const partida = req.body;
    const novaPartida = await salvarPartida(partida);
    resp.status(201).send(novaPartida);  
  } catch (error) {
    console.error("Erro ao salvar partida:", error);
    resp.status(500).send({ message: "Erro ao salvar partida. Tente novamente mais tarde." });
  }
});

router.get('/partida', async (req, resp) => {
  try {
    const partidas = await listarPartidas();
    resp.status(200).send(partidas);
  } catch (error) {
    console.error("Erro ao listar partidas:", error);
    resp.status(500).send({ message: "Erro ao listar partidas. Tente novamente mais tarde." });
  }
});

router.get('/partida/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const partida = await buscarPartidaPorId(id);
    
    if (partida) {
      resp.status(200).send(partida);
    } else {
      resp.status(404).send({ message: "Partida não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar partida:", error);
    resp.status(500).send({ message: "Erro ao buscar partida. Tente novamente mais tarde." });
  }
});

export default router;
