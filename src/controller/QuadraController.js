import { Router } from "express";
import { salvarQuadra, listarQuadras, buscarQuadraPorId } from "../repository/QuadraRepository.js";

const router = Router();

router.post('/quadra', async (req, resp) => {
  const quadra = req.body;
  const novaQuadra = await salvarQuadra(quadra);
  resp.send(novaQuadra);
});

router.get('/quadra', async (req, resp) => {
  const quadras = await listarQuadras();
  resp.send(quadras);
});

router.get('/quadra/:id', async (req, resp) => {
  const id = req.params.id;
  const quadra = await buscarQuadraPorId(id);
  resp.send(quadra);
});

export default router;
