import express from 'express';
import { logAction } from '../controllers/logController.js';

const router = express.Router();

// Logs são gerenciados automaticamente pelo sistema.
router.post('/', async (req, res) => {
    try {
        const log = await logAction(req.body);
        res.status(201).send(log);
    } catch (err) {
        console.error('Erro ao salvar log:', err);
        res.status(500).send({ message: 'Erro ao salvar log.' });
    }
});

export default router;
