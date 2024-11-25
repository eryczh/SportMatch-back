import {
    addAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    listAvaliacoesByQuadra
} from '../repositories/avaliacaoRepository.js';
import { logAction } from './logController.js';

export async function handleAddAvaliacao(req, res) {
    try {
        const avaliacao = req.body;
        const newAvaliacao = await addAvaliacao(avaliacao);

        await logAction(
            `Avaliação adicionada para quadra ${avaliacao.id_quadra} pelo usuário ${avaliacao.id_usuario}`,
            avaliacao.id_usuario,
            'Criação de Avaliação',
            'Sucesso'
        );

        res.status(201).send(newAvaliacao);
    } catch (err) {
        console.error('Erro ao adicionar avaliação:', err);
        res.status(500).send({ message: 'Erro ao adicionar avaliação.' });
    }
}

export async function handleUpdateAvaliacao(req, res) {
    try {
        const id = req.params.id;
        const { nota, comentario } = req.body;

        await updateAvaliacao(id, nota, comentario);

        await logAction(
            `Avaliação atualizada - ID: ${id} - Nota: ${nota}`,
            id,
            'Atualização de Avaliação',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar avaliação:', err);
        res.status(500).send({ message: 'Erro ao atualizar avaliação.' });
    }
}

export async function handleDeleteAvaliacao(req, res) {
    try {
        const id = req.params.id;

        await deleteAvaliacao(id);

        await logAction(
            `Avaliação removida - ID: ${id}`,
            id,
            'Remoção de Avaliação',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao deletar avaliação:', err);
        res.status(500).send({ message: 'Erro ao deletar avaliação.' });
    }
}

export async function handleListAvaliacoes(req, res) {
    try {
        const { id_quadra } = req.query;
        const avaliacoes = await listAvaliacoesByQuadra(id_quadra);
        res.send(avaliacoes);
    } catch (err) {
        console.error('Erro ao listar avaliações:', err);
        res.status(500).send({ message: 'Erro ao listar avaliações.' });
    }
}
