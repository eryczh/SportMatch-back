import { Router } from "express";
import { salvarTagEsporte, listarTagsEsportes, buscarTagEsportePorId } from "../repository/TagEsporteRepository.js";

const router = Router();

router.post('/tag/esporte', async (req, resp) => {
  const tag = req.body;
  const novaTag = await salvarTagEsporte(tag);
  resp.send(novaTag);
});

router.get('/tag/esporte', async (req, resp) => {
  const tags = await listarTagsEsportes();
  resp.send(tags);
});

router.get('/tag/esporte/:id', async (req, resp) => {
  const id = req.params.id;
  const tag = await buscarTagEsportePorId(id);
  resp.send(tag);
});

export default router;
