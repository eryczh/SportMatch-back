import {
    addQuadraImage,
    listQuadraImages,
    deleteQuadraImage,
    createQuadra,
    updateQuadra,
    deleteQuadra,
    listQuadrasByAdmin,
    listAllQuadras,
    checkQuadraAvailability
} from '../repositories/quadraRepository.js';
import { logAction } from './logController.js';

// Adicionar imagem à quadra
export async function handleAddQuadraImage(req, res) {
    try {
        const { id_quadra, url_imagem } = req.body;

        if (!id_quadra || !url_imagem) {
            return res.status(400).send({ message: 'ID da quadra e URL da imagem são obrigatórios.' });
        }

        const id_imagem = await addQuadraImage(id_quadra, url_imagem);

        res.status(201).send({ id_imagem, id_quadra, url_imagem });
    } catch (err) {
        console.error('Erro ao adicionar imagem à quadra:', err);
        res.status(500).send({ message: 'Erro ao adicionar imagem à quadra.' });
    }
}

// Listar imagens de uma quadra
export async function handleListQuadraImages(req, res) {
    try {
        const { id_quadra } = req.params;

        if (!id_quadra) {
            return res.status(400).send({ message: 'ID da quadra é obrigatório.' });
        }

        const imagens = await listQuadraImages(id_quadra);

        res.send(imagens);
    } catch (err) {
        console.error('Erro ao listar imagens da quadra:', err);
        res.status(500).send({ message: 'Erro ao listar imagens da quadra.' });
    }
}

// Excluir imagem da quadra
export async function handleDeleteQuadraImage(req, res) {
    try {
        const { id_imagem } = req.params;

        if (!id_imagem) {
            return res.status(400).send({ message: 'ID da imagem é obrigatório.' });
        }

        const rowsAffected = await deleteQuadraImage(id_imagem);

        if (!rowsAffected) {
            return res.status(404).send({ message: 'Imagem não encontrada.' });
        }

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao excluir imagem da quadra:', err);
        res.status(500).send({ message: 'Erro ao excluir imagem da quadra.' });
    }
}

// Criar quadra
export async function handleCreateQuadra(req, res) {
    try {
        const quadra = req.body;
        const newQuadra = await createQuadra(quadra);

        await logAction(
            `Quadra criada: ${quadra.nome}`,
            quadra.id_administrador,
            'Criação de Quadra',
            'Sucesso'
        );

        res.status(201).send(newQuadra);
    } catch (err) {
        console.error('Erro ao criar quadra:', err);
        res.status(500).send({ message: 'Erro ao criar quadra.' });
    }
}

// Atualizar quadra
export async function handleUpdateQuadra(req, res) {
    try {
        const id = req.params.id;
        const quadra = req.body;

        const rowsAffected = await updateQuadra(id, quadra);

        if (!rowsAffected) {
            return res.status(403).send({ message: 'Permissão negada ou quadra não encontrada.' });
        }

        await logAction(
            `Quadra atualizada: ${quadra.nome}`,
            quadra.id_administrador,
            'Atualização de Quadra',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar quadra:', err);
        res.status(500).send({ message: 'Erro ao atualizar quadra.' });
    }
}

// Excluir quadra
export async function handleDeleteQuadra(req, res) {
    try {
        const id = req.params.id;
        const { id_administrador } = req.body;

        const rowsAffected = await deleteQuadra(id, id_administrador);

        if (!rowsAffected) {
            return res.status(403).send({ message: 'Permissão negada ou quadra não encontrada.' });
        }

        await logAction(
            `Quadra deletada com ID: ${id}`,
            id_administrador,
            'Exclusão de Quadra',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao deletar quadra:', err);
        res.status(500).send({ message: 'Erro ao deletar quadra.' });
    }
}

// Listar quadras de um administrador
export async function handleListQuadrasByAdmin(req, res) {
    try {
        const { id_administrador } = req.query;
        const quadras = await listQuadrasByAdmin(id_administrador);

        res.send(quadras);
    } catch (err) {
        console.error('Erro ao listar quadras do administrador:', err);
        res.status(500).send({ message: 'Erro ao listar quadras.' });
    }
}

// Listar todas as quadras
export async function handleListAllQuadras(req, res) {
    try {
        const quadras = await listAllQuadras();
        res.send(quadras);
    } catch (err) {
        console.error('Erro ao listar todas as quadras:', err);
        res.status(500).send({ message: 'Erro ao listar quadras.' });
    }
}

// Verificar disponibilidade de quadra
export async function handleCheckQuadraAvailability(req, res) {
    try {
        const { id_quadra, data } = req.query;

        const isAvailable = await checkQuadraAvailability(id_quadra, data);

        res.send({ disponivel: isAvailable });
    } catch (err) {
        console.error('Erro ao verificar disponibilidade da quadra:', err);
        res.status(500).send({ message: 'Erro ao verificar disponibilidade.' });
    }
}
