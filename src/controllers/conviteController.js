import {
    addConvite,
    getConviteByJogador,
    removeConvite,
    updateConviteStatus
} from '../repositories/conviteRepository.js';
import { logAction } from './logController.js';

// Adicionar convite
export async function handleAddConvite(req, res) {
    try {
        const convite = req.body;
        const newConvite = await addConvite(convite);

        await logAction(
            `Convite enviado para o jogador ${convite.id_jogador}`,
            convite.id_criador,
            'Criação de Convite',
            'Sucesso'
        );

        res.status(201).send(newConvite);
    } catch (err) {
        console.error('Erro ao criar convite:', err);
        res.status(500).send({ message: 'Erro ao criar convite.' });
    }
}

// Buscar convite por ID do jogador convidado
export async function handleGetConvitesByJogador(req, res) {
    try {
        const { id_jogador } = req.params;

        const convites = await getConviteByJogador(id_jogador);

        res.send(convites);
    } catch (err) {
        console.error('Erro ao buscar convites:', err.message);
        res.status(500).send({ message: 'Erro ao buscar convites.' });
    }
}

// Remover convite
export async function handleDeleteConvite(req, res) {
    try {
        const id = req.params.id;

        await removeConvite(id);

        await logAction(
            `Convite ${id} removido`,
            null,
            'Exclusão de Convite',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao remover convite:', err.message);
        res.status(500).send({ message: 'Erro ao remover convite.' });
    }
}

export async function handleUpdateConviteStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).send({ message: 'ID e status são obrigatórios.' });
        }

        await updateConviteStatus(id, status);

        await logAction(
            `Convite ${id} atualizado para o status ${status}`,
            null,
            'Atualização de Convite',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar status do convite:', err.message);
        res.status(500).send({ message: 'Erro ao atualizar status do convite.' });
    }
}