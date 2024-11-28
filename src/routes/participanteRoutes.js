import express from 'express';
import {
    handleAddParticipante,
    handleUpdateParticipante,
    handleRemoveParticipante,
    handleListParticipantes,
    handleListParticipacoesByUsuario
} from '../controllers/participanteController.js';

const router = express.Router();

router.post('/', handleAddParticipante);
router.put('/:id', handleUpdateParticipante);
router.delete('/:id', handleRemoveParticipante);
router.get('/', handleListParticipantes);
router.get('/participacoes/usuario', handleListParticipacoesByUsuario);

export default router;
