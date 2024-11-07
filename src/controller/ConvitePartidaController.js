import { Router } from "express";
import { salvarConvite, listarConvitesPorPartida, atualizarStatusConvite } from "../repository/ConvitePartidaRepository.js";

const router = Router();

router.post('/convite', async (req, resp) => {
  try {
    const convite = req.body;
    const novoConvite = await salvarConvite(convite);
    resp.status(201).send(novoConvite);
  } catch (error) {
    console.error("Erro ao salvar convite:", error);
    resp.status(500).send({ message: "Erro ao salvar convite" });
  }
});

router.get('/convite/partida/:idPartida', async (req, resp) => {
  try {
    const idPartida = req.params.idPartida;
    const convites = await listarConvitesPorPartida(idPartida);
    
    if (convite.lenght > 0) {
      resp.send(convites);
    } else {
      resp.status(404).send({ message: "Nenhum convite encontrado para estar partida"});
    }
  } catch (error) {
    console.error("Error ao listar convites por partida:", error);
    resp.status(500).send({ message: "Erro ao listar convites" });
  }
});

router.put('/convite/:id/status', async (req, resp) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const resultado = await atualizarStatusConvite(id. status);

    if (resultado) {
      resp.status(200).send({ message: "Status atualizado com sucesso" });
    } else {
      resp.status(404).send({ message: "Convite não encontro" });
    }
  } catch (error) {
    console.error("Erro ao atualizar status do convite:", error);
    resp.status(500).send({ message: "Erro ao atualizar status do convite" });
  }
});

export default router;
