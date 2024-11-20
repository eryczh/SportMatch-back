import { Router } from "express";
import { criarPartida, participarPartida, sairPartida, verificarPartidasDisponiveis, verificarPartidasPorJogador } from "../repository/PartidaRepository.js";

const router = Router();

router.post('/partidas', async (req, resp) => {
  try {
    const partida = req.body;
    const novaPartida = await criarPartida(partida);
    resp.status(201).send(novaPartida);
  } catch (error) {
    console.error("Erro ao criar partida:", error);
    resp.status(500).send({ message: "Erro ao criar a partida. Tente novamente mais tarde." });
  }
});

router.post('/partidas/participar', async (req, resp) => {
  try {
    const { idPartida, idJogador } = req.body;
    const resultado = await participarPartida(idPartida, idJogador);
    resp.status(200).send(resultado);
  } catch (error) {
    console.error("Erro ao participar da partida:", error);
    resp.status(500).send({ message: "Erro ao participar da partida. Tente novamente mais tarde." });
  }
});

router.post('/partidas/sair', async (req, resp) => {
  try {
    const { idPartida, idJogador } = req.body;
    const resultado = await sairPartida(idPartida, idJogador);
    resp.status(200).send(resultado);
  } catch (error) {
    console.error("Erro ao sair da partida:", error);
    resp.status(500).send({ message: "Erro ao sair da partida. Tente novamente mais tarde." });
  }
});

router.get('/partidas/disponiveis', async (req, resp) => {
  try {
    const partidas = await verificarPartidasDisponiveis();
    resp.status(200).send(partidas);
  } catch (error) {
    console.error("Erro ao buscar partidas disponíveis:", error);
    resp.status(500).send({ message: "Erro ao buscar partidas disponíveis. Tente novamente mais tarde." });
  }
});

router.get('/partidas/jogador', async (req, resp) => {
  try {
    const { idJogador, status } = req.query;
    const partidas = await verificarPartidasPorJogador(idJogador, status);
    resp.status(200).send(partidas);
  } catch (error) {
    console.error("Erro ao buscar partidas do jogador:", error);
    resp.status(500).send({ message: "Erro ao buscar partidas do jogador. Tente novamente mais tarde." });
  }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
export default router;
