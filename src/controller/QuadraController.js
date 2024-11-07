import { Router } from "express";
import { salvarQuadra, listarQuadras, buscarQuadraPorId } from "../repository/QuadraRepository.js";

const router = Router();

router.post('/quadra', async (req, resp) => {
  try {
    const quadra = req.body;
    const novaQuadra = await salvarQuadra(quadra);
    resp.status(201).send(novaQuadra); 
  } catch (error) {
    console.error("Erro ao salvar quadra:", error);
    resp.status(500).send({ message: "Erro ao salvar quadra. Tente novamente mais tarde." });
  }
});

router.get('/quadra', async (req, resp) => {
  try {
    const quadras = await listarQuadras();
    resp.status(200).send(quadras);
  } catch (error) {
    console.error("Erro ao listar quadras:", error);
    resp.status(500).send({ message: "Erro ao listar quadras. Tente novamente mais tarde." });
  }
});

router.get('/quadra/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const quadra = await buscarQuadraPorId(id);
    
    if (quadra) {
      resp.status(200).send(quadra);
    } else {
      resp.status(404).send({ message: "Quadra não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar quadra:", error);
    resp.status(500).send({ message: "Erro ao buscar quadra. Tente novamente mais tarde." });
  }
});

export default router;
