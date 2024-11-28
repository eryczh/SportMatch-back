import {
    addParticipante,
    updateParticipante,
    removeParticipante,
    listParticipantesByPartida
} from '../repositories/participanteRepository.js';
import { logAction } from './logController.js';

export async function handleAddParticipante(req, res) {
    try {
        const participante = req.body;
        const newParticipante = await addParticipante(participante);

        await logAction(
            `Participante adicionado à partida ${participante.id_partida}`,
            participante.id_usuario,
            'Adição de Participante',
            'Sucesso'
        );

        res.status(201).send(newParticipante);
    } catch (err) {
        console.error('Erro ao adicionar participante:', err);
        res.status(500).send({ message: 'Erro ao adicionar participante.' });
    }
}

export async function handleUpdateParticipante(req, res) {
    try {
        const id = req.params.id;
        const { status } = req.body;

        await updateParticipante(id, status);

        await logAction(
            `Status do participante ${id} atualizado para ${status}`,
            id,
            'Atualização de Participante',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar participante:', err);
        res.status(500).send({ message: 'Erro ao atualizar participante.' });
    }
}

export async function handleRemoveParticipante(req, res) {
    try {
        const id = req.params.id;

        await removeParticipante(id);

        await logAction(
            `Participante removido com ID: ${id}`,
            id,
            'Remoção de Participante',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao remover participante:', err);
        res.status(500).send({ message: 'Erro ao remover participante.' });
    }
}

export async function handleListParticipantes(req, res) {
    try {
        const { id } = req.params;

        const participacoes = await listParticipantesByPartida(id);
        res.send(participacoes);
    } catch (err) {
        console.error('Erro ao listar participações da partida:', err.message);
        res.status(500).send({ message: 'Erro ao listar participações da partida.' });
    }
}