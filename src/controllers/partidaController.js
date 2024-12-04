import {
    createPartida,
    deletePartida,
    listPartidas,
    listPartidasByUser,
    listPartidasByAdmin,
    updatePartidaStatus,
    listPartidasParticipadasByUser,
    listPartidasDisponiveis,
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

export async function handleListPartidasByAdmin(req, res) {
    try {
        const { id_administrador } = req.query;

        if (!id_administrador) {
            return res.status(400).send({ message: 'ID do administrador é obrigatório.' });
        }

        const partidas = await listPartidasByAdmin(id_administrador);
        res.status(200).send(partidas);
    } catch (err) {
        console.error('Erro ao listar partidas do administrador:', err.message);
        res.status(500).send({ message: 'Erro ao listar partidas do administrador.' });
    }
}

export async function handleUpdatePartidaStatus(req, res) {
    try {
        const { id_partida, status } = req.body;

        if (!id_partida || !status) {
            return res.status(400).send({ message: 'ID da partida e status são obrigatórios.' });
        }

        const rowsAffected = await updatePartidaStatus(id_partida, status);

        if (!rowsAffected) {
            return res.status(404).send({ message: 'Partida não encontrada.' });
        }

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar status da partida:', err.message);
        res.status(500).send({ message: 'Erro ao atualizar status da partida.' });
    }
}

export async function handleListPartidasParticipadasByUser(req, res) {
    try {
        const id_usuario = req.params.id;

        if (!id_usuario) {
            return res.status(400).send({ message: 'ID do usuário é obrigatório.' });
        }

        const partidas = await listPartidasParticipadasByUser(id_usuario);

        if (partidas.length === 0) {
            return res.status(404).send({ message: 'Nenhuma participação encontrada para o usuário.' });
        }

        res.status(200).send(partidas);
    } catch (err) {
        console.error('Erro ao listar partidas participadas:', err.message);
        res.status(500).send({ message: 'Erro ao listar partidas participadas pelo usuário.' });
    }
}

export async function handleListAvailableHorarios(req, res) {
    try {
        const { id_quadra, data } = req.body;

        if (!id_quadra || !data) {
            return res.status(400).send({ message: 'ID da quadra e data são obrigatórios.' });
        }

        // Chama o método no repository para buscar os horários ocupados
        const partidas = await listPartidasDisponiveis(id_quadra, data);

        // Define os horários possíveis (por exemplo, de 8h às 22h)
        const horariosPossiveis = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

        // Extrai os horários ocupados das partidas
        const horariosOcupados = partidas.map((partida) =>
            new Date(partida.data_horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        );

        // Calcula os horários disponíveis
        const horariosDisponiveis = horariosPossiveis.filter((horario) => !horariosOcupados.includes(horario));

        res.status(200).send(horariosDisponiveis);
    } catch (err) {
        console.error('Erro ao listar horários disponíveis:', err.message);
        res.status(500).send({ message: 'Erro ao listar horários disponíveis.' });
    }
}
