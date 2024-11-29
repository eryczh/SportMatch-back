import express from 'express';
import {
    handleAddConvite,
    handleGetConvitesByJogador,
    handleUpdateConviteStatus,
    handleDeleteConvite
} from '../controllers/conviteController.js';

const router = express.Router();

// Criar convite
router.post('/', handleAddConvite);

// Buscar convites por jogador
router.get('/:id_jogador', handleGetConvitesByJogador);

// Atualizar status do convite
router.put('/:id_convite', handleUpdateConviteStatus);

// Excluir convite
router.delete('/:id_convite', handleDeleteConvite);

export default router;
