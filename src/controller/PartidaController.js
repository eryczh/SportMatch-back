import { Router } from "express";
import { salvarPartida, listarPartidas, buscarPartidaPorId } from "../repository/PartidaRepository.js";

const router = Router();

router.post('/partida', async (req, resp) => {
  const partida = req.body;
  const novaPartida = await salvarPartida(partida);
  resp.send(novaPartida);
});

router.get('/partida', async (req, resp) => {
  const partidas = await listarPartidas();
  resp.send(partidas);
});

router.get('/partida/:id', async (req, resp) => {
  const id = req.params.id;
  const partida = await buscarPartidaPorId(id);
  if (partida) {
    resp.send(partida);
  } else {
    resp.status(404).send({ message: "Partida não encontrada" });
  }
});

export default router;
