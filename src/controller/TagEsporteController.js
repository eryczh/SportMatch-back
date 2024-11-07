import { Router } from "express";
import { salvarTagEsporte, listarTagsEsportes, buscarTagEsportePorId } from "../repository/TagEsporteRepository.js";

const router = Router();

router.post('/tag/esporte', async (req, resp) => {
  try {
    const tag = req.body;
    const novaTag = await salvarTagEsporte(tag);
    resp.status(201).send(novaTag); 
  } catch (error) {
    console.error("Erro ao salvar tag de esporte:", error);
    resp.status(500).send({ message: "Erro ao salvar tag de esporte. Tente novamente mais tarde." });
  }
});

router.get('/tag/esporte', async (req, resp) => {
  try {
    const tags = await listarTagsEsportes();
    resp.status(200).send(tags);
  } catch (error) {
    console.error("Erro ao listar tags de esporte:", error);
    resp.status(500).send({ message: "Erro ao listar tags de esporte. Tente novamente mais tarde." });
  }
});

router.get('/tag/esporte/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const tag = await buscarTagEsportePorId(id);

    if (tag) {
      resp.status(200).send(tag);
    } else {
      resp.status(404).send({ message: "Tag de esporte não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar tag de esporte:", error);
    resp.status(500).send({ message: "Erro ao buscar tag de esporte. Tente novamente mais tarde." });
  }
});

export default router;
