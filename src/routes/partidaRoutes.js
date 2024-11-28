import express from 'express';
import {
    handleCreatePartida,
    handleDeletePartida,
    handleListPartidas,
    handleListPartidasByUser,
    handleListPartidasByAdmin,
    handleUpdatePartidaStatus,
    handleListPartidasParticipadasByUser,
} from '../controllers/partidaController.js';

const router = express.Router();

router.post('/', handleCreatePartida);
router.delete('/:id', handleDeletePartida);
router.get('/', handleListPartidas); // Listar todas as partidas
router.get('/user', handleListPartidasByUser); // Listar partidas por usuário
router.get('/admin', handleListPartidasByAdmin); // Nova rota para administrador
router.put('/status', handleUpdatePartidaStatus); // Nova rota para atualizar status
router.get('/participadas/:id', handleListPartidasParticipadasByUser);

export default router;