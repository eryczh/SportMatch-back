import express from 'express';
import {
    handleCreateUser,
    handleGetUserById,
    handleUpdateUser,
    handleAuthenticateUser,
} from '../controllers/userController.js';

const router = express.Router();

// Criar usuário
router.post('/', handleCreateUser);

// Buscar usuário por ID
router.get('/:id', handleGetUserById);

// Atualizar usuário
router.put('/:id', handleUpdateUser);

// Autenticar usuário
router.post('/auth', handleAuthenticateUser);

export default router;
