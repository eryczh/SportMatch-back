import { Router } from "express";
import { salvarLog, listarLogs } from "../repository/LogRepository.js";

const router = Router();

router.post('/log', async (req, resp) => {
  const log = req.body;
  const novoLog = await salvarLog(log);
  resp.send(novoLog);
});

router.get('/log', async (req, resp) => {
  const logs = await listarLogs();
  resp.send(logs);
});

export default router;
