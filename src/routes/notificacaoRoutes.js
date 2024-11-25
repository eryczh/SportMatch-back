import express from 'express';
import {
    handleCreateNotificacao,
    handleMarkAsRead,
    handleDeleteNotificacao,
    handleListNotificacoes
} from '../controllers/notificacaoController.js';

const router = express.Router();

router.post('/', handleCreateNotificacao);
router.put('/:id', handleMarkAsRead);
router.delete('/:id', handleDeleteNotificacao);
router.get('/', handleListNotificacoes);

export default router;
