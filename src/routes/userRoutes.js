import express from 'express';
import {
    handleCreateUser,
    handleGetUserById,
    handleAuthenticateUser,
    handleUpdateUserFields,
    handleUpdateUserPhoto,
} from '../controllers/userController.js';

const router = express.Router();

// Criar usuário
router.post('/', handleCreateUser);

// Buscar usuário por ID
router.get('/:id', handleGetUserById);

// Autenticar usuário
router.post('/auth', handleAuthenticateUser);

// Atualizar campos do perfil
router.put('/:id/fields', handleUpdateUserFields);

// Atualizar foto de perfil
router.put('/:id/foto', handleUpdateUserPhoto);

export default router;
