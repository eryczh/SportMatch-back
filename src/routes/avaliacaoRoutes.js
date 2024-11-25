import express from 'express';
import {
    handleAddAvaliacao,
    handleUpdateAvaliacao,
    handleDeleteAvaliacao,
    handleListAvaliacoes
} from '../controllers/avaliacaoController.js';

const router = express.Router();

router.post('/', handleAddAvaliacao);
router.put('/:id', handleUpdateAvaliacao);
router.delete('/:id', handleDeleteAvaliacao);
router.get('/', handleListAvaliacoes);

export default router;
