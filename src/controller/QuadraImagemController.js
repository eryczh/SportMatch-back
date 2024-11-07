import { Router } from "express";
import { salvarImagemQuadra, listarImagensPorQuadra, removerImagem } from "../repository/QuadraImagemRepository.js";

const router = Router();

router.post('/quadra/imagem', async (req, resp) => {
  const imagem = req.body;
  const novaImagem = await salvarImagemQuadra(imagem);
  resp.send(novaImagem);
});

router.get('/quadra/imagens/:idQuadra', async (req, resp) => {
  const idQuadra = req.params.idQuadra;
  const imagens = await listarImagensPorQuadra(idQuadra);
  resp.send(imagens);
});

router.delete('/quadra/imagem/:id', async (req, resp) => {
  const id = req.params.id;
  const resultado = await removerImagem(id);
  resp.status(resultado ? 202 : 404).send();
});

export default router;
