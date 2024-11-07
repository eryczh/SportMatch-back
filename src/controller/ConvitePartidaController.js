import { Router } from "express";
import { salvarConvite, listarConvitesPorPartida, atualizarStatusConvite } from "../repository/ConvitePartidaRepository.js";

const router = Router();

router.post('/convite', async (req, resp) => {
  const convite = req.body;
  const novoConvite = await salvarConvite(convite);
  resp.send(novoConvite);
});

router.get('/convite/partida/:idPartida', async (req, resp) => {
  const idPartida = req.params.idPartida;
  const convites = await listarConvitesPorPartida(idPartida);
  resp.send(convites);
});

router.put('/convite/:id/status', async (req, resp) => {
  const id = req.params.id;
  const { status } = req.body;
  const resultado = await atualizarStatusConvite(id, status);
  
  if (resultado) {
    resp.status(200).send({ message: "Status atualizado com sucesso" });
  } else {
    resp.status(404).send({ message: "Convite não encontrado" });
  }
});

export default router;
