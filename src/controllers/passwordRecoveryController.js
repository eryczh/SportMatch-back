import { createRecoveryCode, getValidRecoveryCode, deleteOldRecoveryCodes } from '../repositories/passwordRecoveryRepository.js';
import { getUserByEmail, updatePassword } from '../repositories/UserRepository.js';
import { sendRecoveryEmail } from '../services/emailService.js'; // Serviço de envio de e-mails
import crypto from 'crypto'; // Para gerar códigos aleatórios
import { handleUpdatePassword } from './userController.js';

// Solicitar recuperação de senha
export async function handleRequestPasswordRecovery(req, res) {
    try {
        const { email } = req.body;

        // Verificar se o email existe
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: 'E-mail não encontrado.' });
        }

        // Gerar um código de recuperação (6 dígitos numéricos)
        const code = crypto.randomInt(100000, 999999);

        // Remover códigos antigos e criar um novo
        await deleteOldRecoveryCodes(user.id_usuario);
        await createRecoveryCode(user.id_usuario, code);

        // Enviar e-mail com o código
        await sendRecoveryEmail(email, code);

        res.status(200).send({ message: 'Código de recuperação enviado para o e-mail.' });
    } catch (err) {
        console.error('Erro ao solicitar recuperação de senha:', err.message);
        res.status(500).send({ message: 'Erro ao solicitar recuperação de senha.' });
    }
}

// Verificar código de recuperação
export async function handleVerifyRecoveryCode(req, res) {
    try {
        const { email, code } = req.body;

        // Verificar se o e-mail existe
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: 'E-mail não encontrado.' });
        }

        // Verificar o código de recuperação
        const recovery = await getValidRecoveryCode(user.id_usuario, code);
        if (!recovery) {
            return res.status(400).send({ message: 'Código inválido ou expirado.' });
        }

        res.status(200).send({ message: 'Código válido.' });
    } catch (err) {
        console.error('Erro ao verificar código de recuperação:', err.message);
        res.status(500).send({ message: 'Erro ao verificar código de recuperação.' });
    }
}

// Alterar senha
// Redefinir senha usando código de recuperação
export async function handleResetPassword(req, res) {
    try {
        const { email, code, newPassword } = req.body;

        // Verificar se o e-mail existe
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ message: 'E-mail não encontrado.' });
        }

        // Verificar código de recuperação
        const recovery = await getValidRecoveryCode(user.id_usuario, code);
        if (!recovery) {
            return res.status(400).send({ message: 'Código inválido ou expirado.' });
        }

        // Criptografar nova senha
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Atualizar senha no banco de dados
        await updatePassword(user.id_usuario, newPasswordHash);

        // Remover códigos antigos
        await deleteOldRecoveryCodes(user.id_usuario);

        res.status(200).send({ message: 'Senha alterada com sucesso.' });
    } catch (err) {
        console.error('Erro ao redefinir senha:', err.message);
        res.status(500).send({ message: 'Erro ao redefinir senha.' });
    }
}

