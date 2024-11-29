import express from 'express';
import {
    handleCreateQuadra,
    handleUpdateQuadra,
    handleDeleteQuadra,
    handleListQuadrasByAdmin,
    handleListAllQuadras,
    handleCheckQuadraAvailability,
    handleAddQuadraImage, // Nova funcionalidade de adicionar imagens
    handleListQuadraImages, // Nova funcionalidade de listar imagens
    handleDeleteQuadraImage // Nova funcionalidade de deletar imagens
} from '../controllers/quadraController.js';

const router = express.Router();

router.post('/', handleCreateQuadra);
router.put('/:id', handleUpdateQuadra);
router.delete('/:id', handleDeleteQuadra);
router.get('/admin', handleListQuadrasByAdmin); // Listar quadras do administrador
router.get('/', handleListAllQuadras); // Listar todas as quadras
router.get('/disponibilidade', handleCheckQuadraAvailability); // Verificar disponibilidade

// Rotas para imagens de quadras
router.post('/imagens', handleAddQuadraImage); // Adicionar imagem à quadra
router.get('/:id_quadra/imagens', handleListQuadraImages); // Listar imagens de uma quadra
router.delete('/imagens/:id_imagem', handleDeleteQuadraImage); // Excluir imagem da quadra


export default router;
