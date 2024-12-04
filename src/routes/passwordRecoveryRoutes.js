import express from 'express';
import {
    handleRequestPasswordRecovery,
    handleVerifyRecoveryCode,
    handleResetPassword,
} from '../controllers/passwordRecoveryController.js';

const router = express.Router();

router.post('/request', handleRequestPasswordRecovery); // Solicitar código de recuperação
router.post('/verify', handleVerifyRecoveryCode); // Verificar código
router.post('/reset', handleResetPassword); // Redefinir senha

export default router;