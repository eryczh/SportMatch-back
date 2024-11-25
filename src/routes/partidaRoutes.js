import express from 'express';
import {
    handleCreatePartida,
    handleUpdatePartida,
    handleDeletePartida,
    handleListPartidas,
    handleListPartidasByUser,
} from '../controllers/partidaController.js';

const router = express.Router();

router.post('/', handleCreatePartida);
router.put('/:id', handleUpdatePartida);
router.delete('/:id', handleDeletePartida);
router.get('/', handleListPartidas); // Listar todas as partidas
router.get('/user', handleListPartidasByUser); // Listar partidas por usuário

export default router;