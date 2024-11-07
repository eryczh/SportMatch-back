import { Router } from "express";
import { salvarLog, listarLogs } from "../repository/LogRepository.js";

const router = Router();

router.post('/log', async (req, resp) => {
  try {
    const log = req.body;
    const novolog = await salvarLog(log);
    resp.status(201).send(novolog);
  } catch (error) {
    console.error("Erro ao salvar log:", error);
    resp.status(500).send({ message: "Erro ao salvar log. Tente novamente mais tarde."});
  }
});

router.get('/log', async (req, resp) => {
  try {
    const logs = await listarLogs();
    resp.status(200).send(logs);
  } catch (error) {
    console.error("Erro ao listar logs:", error);
    resp.status(500).send({message: "Erro ao listar logs. tenta novamente mais tarde."});
  }
});

export default router;
