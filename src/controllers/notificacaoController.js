import {
    createNotificacao,
    markNotificacaoAsRead,
    deleteNotificacao,
    listNotificacoesByUser
} from '../repositories/notificacaoRepository.js';
import { logAction } from './logController.js';

export async function handleCreateNotificacao(req, res) {
    try {
        const notificacao = req.body;
        const newNotificacao = await createNotificacao(notificacao);

        await logAction(
            `Notificação criada para o usuário ${notificacao.id_usuario} - Mensagem: ${notificacao.mensagem}`,
            notificacao.id_usuario,
            'Criação de Notificação',
            'Sucesso'
        );

        res.status(201).send(newNotificacao);
    } catch (err) {
        console.error('Erro ao criar notificação:', err);
        res.status(500).send({ message: 'Erro ao criar notificação.' });
    }
}

export async function handleMarkAsRead(req, res) {
    try {
        const id = req.params.id;

        await markNotificacaoAsRead(id);

        await logAction(
            `Notificação marcada como lida - ID: ${id}`,
            id,
            'Atualização de Notificação',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao marcar notificação como lida:', err);
        res.status(500).send({ message: 'Erro ao marcar notificação como lida.' });
    }
}

export async function handleDeleteNotificacao(req, res) {
    try {
        const id = req.params.id;

        await deleteNotificacao(id);

        await logAction(
            `Notificação deletada - ID: ${id}`,
            id,
            'Remoção de Notificação',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao deletar notificação:', err);
        res.status(500).send({ message: 'Erro ao deletar notificação.' });
    }
}

export async function handleListNotificacoes(req, res) {
    try {
        const { id_usuario } = req.query;
        const notificacoes = await listNotificacoesByUser(id_usuario);
        res.send(notificacoes);
    } catch (err) {
        console.error('Erro ao listar notificações:', err);
        res.status(500).send({ message: 'Erro ao listar notificações.' });
    }
}
