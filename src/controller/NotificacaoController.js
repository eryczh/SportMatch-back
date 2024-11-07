import { Router } from 'express';
import { criarNotificacao, listarNotificacoesPorUsuario, atualizarStatusLido, removerNotificacao } from '../repository/NotificacaoRepository.js';

const servidor = Router();

servidor.post('/notificacao', async (req, res) => {
    try {
        const notificacao = req.body;
        const novaNotificacao = await criarNotificacao(notificacao);
        res.status(201).send(novaNotificacao);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

servidor.get('/notificacao/usuario/:idUsuario', async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const notificacoes = await listarNotificacoesPorUsuario(idUsuario);
        res.send(notificacoes);
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

servidor.put('/notificacao/:idNotificacao/lido', async (req, res) => {
    try {
        const { idNotificacao } = req.params;
        const { lido } = req.body;
        const atualizado = await atualizarStatusLido(idNotificacao, lido);
        if (atualizado) res.status(200).send();
        else res.status(404).send({ erro: 'Notificação não encontrada' });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

servidor.delete('/notificacao/:idNotificacao', async (req, res) => {
    try {
        const { idNotificacao } = req.params;
        const removido = await removerNotificacao(idNotificacao);
        if (removido) res.status(200).send();
        else res.status(404).send({ erro: 'Notificação não encontrada' });
    } catch (err) {
        res.status(500).send({ erro: err.message });
    }
});

export default servidor;
