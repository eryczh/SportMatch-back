import connection from '../db/connection.js';
import { encrypt, decrypt } from '../utils/encryption.js';

// Criação de usuário
export async function createUser(user) {
    const comando = `
        INSERT INTO tb_usuarios 
        (nome, data_nascimento, cpf, email, celular, cep, endereco, cidade, estado, senha_hash, tipo, foto_perfil)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        user.nome,
        user.data_nascimento,
        encrypt(user.cpf), // CPF criptografado
        encrypt(user.email), // Email criptografado
        encrypt(user.celular || ''), // Celular criptografado
        encrypt(user.cep || ''), // CEP criptografado
        encrypt(user.endereco || ''), // Endereço criptografado
        user.cidade,
        user.estado,
        user.senha_hash, // Senha já armazenada como hash
        user.tipo,
        user.foto_perfil || null,
    ]);
    user.id_usuario = result.insertId;
    return user;
}

// Buscar usuário por ID
export async function getUserById(id) {
    const comando = `
        SELECT id_usuario, nome, data_nascimento, cpf, email, celular, cep, endereco, cidade, estado, tipo, foto_perfil 
        FROM tb_usuarios 
        WHERE id_usuario = ?;
    `;
    const [rows] = await connection.query(comando, [id]);
    if (rows.length > 0) {
        const user = rows[0];
        user.cpf = decrypt(user.cpf);
        user.email = decrypt(user.email);
        user.celular = decrypt(user.celular);
        user.cep = decrypt(user.cep);
        user.endereco = decrypt(user.endereco);
        return user;
    }
    return null;
}

// Atualizar informações de usuário
export async function updateUser(id, user) {
    const comando = `
        UPDATE tb_usuarios 
        SET email = ?, celular = ?, endereco = ?, cep = ? 
        WHERE id_usuario = ?;
    `;
    await connection.query(comando, [
        encrypt(user.email), // Email criptografado
        encrypt(user.celular || ''), // Celular criptografado
        encrypt(user.endereco || ''), // Endereço criptografado
        encrypt(user.cep || ''), // CEP criptografado
        id,
    ]);
}

// Autenticar usuário
export async function authenticateUser(email) {
    const comando = `
        SELECT id_usuario, nome, email, senha_hash, tipo, foto_perfil 
        FROM tb_usuarios 
        WHERE email = ?;
    `;

    const [rows] = await connection.query(comando, [encrypt(email)]);
    if (rows.length > 0) {
        return rows[0];
    }
    return null;
}
