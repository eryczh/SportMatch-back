import { Router } from "express";
import { salvarImagemQuadra, listarImagensPorQuadra, removerImagem } from "../repository/QuadraImagemRepository.js";

const router = Router();

router.post('/quadra/imagem', async (req, resp) => {
  try {
    const imagem = req.body;
    const novaImagem = await salvarImagemQuadra(imagem);
    resp.status(201).send(novaImagem);  // Status 201 para indicar criação de recurso
  } catch (error) {
    console.error("Erro ao salvar imagem da quadra:", error);
    resp.status(500).send({ message: "Erro ao salvar imagem. Tente novamente mais tarde." });
  }
});

router.get('/quadra/imagens/:idQuadra', async (req, resp) => {
  try {
    const idQuadra = req.params.idQuadra;
    const imagens = await listarImagensPorQuadra(idQuadra);

    if (imagens && imagens.length > 0) {
      resp.status(200).send(imagens);
    } else {
      resp.status(404).send({ message: "Nenhuma imagem encontrada para a quadra especificada." });
    }
  } catch (error) {
    console.error("Erro ao listar imagens da quadra:", error);
    resp.status(500).send({ message: "Erro ao listar imagens. Tente novamente mais tarde." });
  }
});

router.delete('/quadra/imagem/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const resultado = await removerImagem(id);

    if (resultado) {
      resp.status(202).send({ message: "Imagem removida com sucesso." });
    } else {
      resp.status(404).send({ message: "Imagem não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao remover imagem da quadra:", error);
    resp.status(500).send({ message: "Erro ao remover imagem. Tente novamente mais tarde." });
  }
});

export default router;
