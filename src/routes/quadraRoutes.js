import express from 'express';
import {
    handleCreateQuadra,
    handleUpdateQuadra,
    handleDeleteQuadra,
    handleListQuadrasByAdmin,
    handleListAllQuadras,
    handleCheckQuadraAvailability,
    handleAddQuadraImage,
    handleListQuadraImages,
    handleDeleteQuadraImage
} from '../controllers/quadraController.js';

const router = express.Router();

router.post('/', handleCreateQuadra);
router.put('/:id', handleUpdateQuadra);
router.delete('/:id', handleDeleteQuadra);
router.get('/admin', handleListQuadrasByAdmin); // Listar quadras do administrador
router.get('/', handleListAllQuadras); // Listar todas as quadras
router.get('/disponibilidade', handleCheckQuadraAvailability); // Verificar disponibilidade
router.post('/imagens/:id', handleAddQuadraImage);
router.get('/:id_quadra/imagens', handleListQuadraImages);
router.delete('/imagens/:id_imagem', handleDeleteQuadraImage);


export default router;
