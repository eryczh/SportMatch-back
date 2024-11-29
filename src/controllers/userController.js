import upload from '../utils/uploadConfig.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
    createUser,
    getUserById,
    updateUser,
    authenticateUser,
} from '../repositories/UserRepository.js';
import { logAction } from './logController.js';
const JWT_SECRET = process.env.JWT_SECRET;

// Criar usuário
export async function handleCreateUser(req, res) {
    try {
        const user = req.body;
        user.senha_hash = await bcrypt.hash(user.senha, 10); // Criptografar a senha
        const newUser = await createUser(user);

        await logAction(
            `Usuário criado: ${user.email}`,
            newUser.id_usuario,
            'Criação de Usuário',
            'Sucesso'
        );

        res.status(201).send(newUser);
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).send({ message: 'Erro ao criar usuário.' });
    }
}

// Buscar usuário por ID
export async function handleGetUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await getUserById(id);

        if (user) {
            delete user.senha_hash; // Remover senha ao enviar resposta
            res.send(user);
        } else {
            res.status(404).send({ message: 'Usuário não encontrado.' });
        }
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).send({ message: 'Erro ao buscar usuário.' });
    }
}

// Atualizar usuário
export async function handleUpdateUser(req, res) {
    try {
        upload.single('foto_perfil')(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: 'Erro no upload da foto de perfil.' });
            }

            const id = req.params.id;
            const user = req.body;

            // Se houver upload, adiciona o caminho da foto ao objeto do usuário
            if (req.file) {
                user.foto_perfil = req.file.path;
            }

            await updateUser(id, user);

            await logAction(
                `Usuário atualizado: ${user.email}`,
                id,
                'Atualização de Usuário',
                'Sucesso'
            );

            res.status(204).send();
        });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).send({ message: 'Erro ao atualizar usuário.' });
    }
}
/*
export async function handleUpdateUser(req, res) {
    try {
        const id = req.params.id;
        const user = req.body;

        await updateUser(id, user);

        await logAction(
            `Usuário atualizado: ${user.email}`,
            id,
            'Atualização de Usuário',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).send({ message: 'Erro ao atualizar usuário.' });
    }
}
*/

// Autenticar usuário (Login)
export async function handleAuthenticateUser(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send({ message: 'Email e senha são obrigatórios.' });
        }

        const user = await authenticateUser(email);

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha_hash);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Credenciais inválidas.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email, tipo: user.tipo },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        await logAction(
            `Usuário autenticado: ${email}`,
            user.id_usuario,
            'Autenticação de Usuário',
            'Sucesso'
        );

        res.status(200).send({
            id_usuario: user.id_usuario,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
            foto_perfil: user.foto_perfil,
            token,
        });
    } catch (err) {
        console.error('Erro ao autenticar usuário:', err);
        res.status(500).send({ message: 'Erro ao autenticar usuário.' });
    }
}