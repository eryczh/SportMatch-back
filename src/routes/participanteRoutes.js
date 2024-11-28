import express from 'express';
import {
    handleAddParticipante,
    handleUpdateParticipante,
    handleRemoveParticipante,
    handleListParticipantes
} from '../controllers/participanteController.js';

const router = express.Router();

router.post('/', handleAddParticipante);
router.put('/:id', handleUpdateParticipante);
router.delete('/:id', handleRemoveParticipante);
router.get('/:id', handleListParticipantes);

export default router;
