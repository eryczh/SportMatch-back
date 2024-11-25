import {
    createPartida,
    updatePartida,
    deletePartida,
    listPartidas,
    listPartidasByUser,
} from '../repositories/partidaRepository.js';
import { logAction } from './logController.js';

export async function handleCreatePartida(req, res) {
    try {
        const partida = req.body;
        const newPartida = await createPartida(partida);

        await logAction(
            `Partida criada para a quadra ${partida.id_quadra}`,
            partida.id_criador,
            'Criação de Partida',
            'Sucesso'
        );

        res.status(201).send(newPartida);
    } catch (err) {
        console.error('Erro ao criar partida:', err);
        res.status(500).send({ message: 'Erro ao criar partida.' });
    }
}

export async function handleListPartidas(req, res) {
    try {
        const partidas = await listPartidas();
        res.send(partidas);
    } catch (err) {
        console.error('Erro ao listar partidas:', err);
        res.status(500).send({ message: 'Erro ao listar partidas.' });
    }
}

export async function handleListPartidasByUser(req, res) {
    try {
        const { id_usuario } = req.query;
        const partidas = await listPartidasByUser(id_usuario);
        res.send(partidas);
    } catch (err) {
        console.error('Erro ao listar partidas do usuário:', err);
        res.status(500).send({ message: 'Erro ao listar partidas do usuário.' });
    }
}

export async function handleUpdatePartida(req, res) {
    try {
        const id = req.params.id;
        const partida = req.body;

        const rowsAffected = await updatePartida(id, partida);

        if (!rowsAffected) {
            return res.status(404).send({ message: 'Partida não encontrada.' });
        }

        await logAction(
            `Partida atualizada para a quadra ${partida.id_quadra}`,
            partida.id_criador,
            'Atualização de Partida',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar partida:', err);
        res.status(500).send({ message: 'Erro ao atualizar partida.' });
    }
}

export async function handleDeletePartida(req, res) {
    try {
        const id = req.params.id;

        const rowsAffected = await deletePartida(id);

        if (!rowsAffected) {
            return res.status(404).send({ message: 'Partida não encontrada.' });
        }

        await logAction(
            `Partida deletada com ID: ${id}`,
            id,
            'Exclusão de Partida',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao deletar partida:', err);
        res.status(500).send({ message: 'Erro ao deletar partida.' });
    }
}
