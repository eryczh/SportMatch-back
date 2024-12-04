import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
    createUser,
    getUserById,
    authenticateUser,
    updateUserPhoto,
    updateUserFields,
    getUserByEmail,
    getUserByCpfOrEmail,
    getUserByCPF,
    updatePassword,
} from '../repositories/UserRepository.js';
import { logAction } from './logController.js';
import multer from 'multer';
const JWT_SECRET = process.env.JWT_SECRET;

const upload = multer({ dest: 'storage/perfil' });

// Criar usuário
// Criar usuário
export async function handleCreateUser(req, res) {
    try {
        const user = req.body;

        // Verificar se o CPF ou e-mail já está em uso
        const isUserExists = await getUserByCpfOrEmail(user.cpf, user.email);
        if (isUserExists) {
            return res
                .status(400)
                .send({ message: 'CPF ou e-mail já cadastrado no sistema.' });
        }

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
        const id = req.params.id; // Obtém o ID do usuário a partir dos parâmetros da URL
        const user = await getUserById(id); // Chama a função que consulta o banco de dados

        if (user) {
            delete user.senha_hash; // Remove o hash da senha antes de enviar a resposta
            res.status(200).send(user); // Retorna os dados do usuário
        } else {
            res.status(404).send({ message: 'Usuário não encontrado.' }); // Caso o usuário não exista
        }
    } catch (err) {
        console.error('Erro ao buscar usuário:', err); // Log de erro no servidor
        res.status(500).send({ message: 'Erro ao buscar usuário.' }); // Retorna um erro genérico
    }
}


// Atualizar campos do perfil
export async function handleUpdateUserFields(req, res) {
    try {
        const id = req.params.id;
        const user = req.body;

        await updateUserFields(id, user);

        await logAction(
            `Usuário atualizado: ${user.email}`,
            id,
            'Atualização de Campos do Perfil',
            'Sucesso'
        );

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao atualizar campos do perfil:', err);
        res.status(500).send({ message: 'Erro ao atualizar campos do perfil.' });
    }
}

// Atualizar foto de perfil
export async function handleUpdateUserPhoto(req, res) {
    try {
        upload.single('foto_perfil')(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: 'Erro no upload da foto de perfil.' });
            }

            const id = req.params.id;

            if (!req.file) {
                return res.status(400).send({ message: 'Arquivo da foto de perfil não encontrado.' });
            }

            const fotoPerfilPath = req.file.path;

            await updateUserPhoto(id, fotoPerfilPath);

            await logAction(
                `Foto de perfil atualizada para o usuário com ID: ${id}`,
                id,
                'Atualização de Foto de Perfil',
                'Sucesso'
            );

            res.status(204).send();
        });
    } catch (err) {
        console.error('Erro ao atualizar foto de perfil:', err);
        res.status(500).send({ message: 'Erro ao atualizar foto de perfil.' });
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



export async function handleGetUserByCPF(req, res) {
    try {
        const { cpf } = req.params; // Obtém o email do usuário a partir dos parâmetros da URL
        const user = await getUserByCPF(cpf); // Chama a função que consulta o banco de dados

        if (user) {
            delete user.senha_hash; // Remove o hash da senha antes de enviar a resposta
            res.status(200).send(user); // Retorna os dados do usuário
        } else {
            res.status(201).send({ message: 'Usuário não encontrado.' }); // Caso o usuário não exista
        }
    } catch (err) {
        console.error('Erro ao buscar usuário pelo email:', err); // Log de erro no servidor
        res.status(500).send({ message: 'Erro ao buscar usuário pelo email.' }); // Retorna um erro genérico
    }
}

// Buscar usuário por email
export async function handleGetUserByEmail(req, res) {
    try {
        const { email } = req.params; // Obtém o email do usuário a partir dos parâmetros da URL
        const user = await getUserByEmail(email); // Chama a função que consulta o banco de dados

        if (user) {
            delete user.senha_hash; // Remove o hash da senha antes de enviar a resposta
            res.status(200).send(user); // Retorna os dados do usuário
        } else {
            res.status(201).send({ message: 'Usuário não encontrado.' }); // Caso o usuário não exista
        }
    } catch (err) {
        console.error('Erro ao buscar usuário pelo email:', err); // Log de erro no servidor
        res.status(500).send({ message: 'Erro ao buscar usuário pelo email.' }); // Retorna um erro genérico
    }
}

export async function handleGetUserByCpfOrEmail(req, res) {
    try {
        const { cpf, email } = req.query; // Obtém os parâmetros da query string
        const userExists = await getUserByCpfOrEmail(cpf, email);

        if (userExists) {
            res.status(200).send({ message: 'Usuário encontrado.' });
        } else {
            res.status(201).send({ message: 'Usuário não encontrado.' }); // Caso o usuário não exista
        }
    } catch (err) {
        console.error('Erro ao buscar usuário por CPF ou e-mail:', err);
        res.status(500).send({ message: 'Erro ao buscar usuário.' });
    }
}

// Alterar senha
export async function handleUpdatePassword(req, res) {
    try {
        const { id_usuario, currentPassword, newPassword } = req.body;

        if (!id_usuario || !currentPassword || !newPassword) {
            return res.status(400).send({ message: 'ID do usuário, senha atual e nova senha são obrigatórios.' });
        }

        // Buscar o usuário no banco de dados
        const user = await getUserById(id_usuario);
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        // Verificar se a senha atual está correta
        const isPasswordValid = await bcrypt.compare(currentPassword, user.senha_hash);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Senha atual incorreta.' });
        }

        // Criptografar a nova senha
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Atualizar a senha no banco de dados
        await updatePassword(id_usuario, newPasswordHash);

        // Registrar log de alteração de senha
        await logAction(
            `Senha alterada para o usuário ${id_usuario}`,
            id_usuario,
            'Alteração de Senha',
            'Sucesso'
        );

        res.status(200).send({ message: 'Senha alterada com sucesso.' });
    } catch (err) {
        console.error('Erro ao alterar senha:', err.message);
        res.status(500).send({ message: 'Erro ao alterar senha.' });
    }
}