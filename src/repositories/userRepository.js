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
        user.cpf = decrypt(user.cpf); // Decifra o CPF
        user.email = decrypt(user.email); // Decifra o email
        user.celular = decrypt(user.celular); // Decifra o celular
        user.cep = decrypt(user.cep); // Decifra o CEP
        user.endereco = decrypt(user.endereco); // Decifra o endereço
        return user;
    }
    return null; // Caso o usuário não exista
}

// Atualizar campos do perfil
export async function updateUserFields(id, user) {
    const comando = `
        UPDATE tb_usuarios 
        SET celular = ?, endereco = ?, cep = ?
        WHERE id_usuario = ?;
    `;
    await connection.query(comando, [
        encrypt(user.celular || ''), // Criptografar celular
        encrypt(user.endereco || ''), // Criptografar endereço
        encrypt(user.cep || ''), // Criptografar CEP
        id,
    ]);
}

// Atualizar foto de perfil
export async function updateUserPhoto(id, fotoPerfilPath) {
    const comando = `
        UPDATE tb_usuarios 
        SET foto_perfil = ?
        WHERE id_usuario = ?;
    `;
    await connection.query(comando, [fotoPerfilPath, id]);
}

/*
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
*/

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

// Buscar usuário por email
export async function getUserByEmail(email) {
    const comando = `
        SELECT id_usuario, nome, data_nascimento, cpf, email, celular, cep, endereco, cidade, estado, tipo, foto_perfil 
        FROM tb_usuarios 
        WHERE email = ?;
    `;
    const [rows] = await connection.query(comando, [encrypt(email)]); // Email é criptografado antes da consulta
    if (rows.length > 0) {
        const user = rows[0];
        user.cpf = decrypt(user.cpf); // Decifra o CPF
        user.email = decrypt(user.email); // Decifra o email
        user.celular = decrypt(user.celular); // Decifra o celular
        user.cep = decrypt(user.cep); // Decifra o CEP
        user.endereco = decrypt(user.endereco); // Decifra o endereço
        return user;
    }
    return null; // Retorna null se o usuário não for encontrado
}

export async function getUserByCPF(cpf) {
    const comando = `
        SELECT id_usuario, nome, data_nascimento, cpf, email, celular, cep, endereco, cidade, estado, tipo, foto_perfil 
        FROM tb_usuarios 
        WHERE cpf = ?;
    `;
    const [rows] = await connection.query(comando, [encrypt(cpf)]); // Email é criptografado antes da consulta
    if (rows.length > 0) {
        const user = rows[0];
        user.cpf = decrypt(user.cpf); // Decifra o CPF
        user.email = decrypt(user.email); // Decifra o email
        user.celular = decrypt(user.celular); // Decifra o celular
        user.cep = decrypt(user.cep); // Decifra o CEP
        user.endereco = decrypt(user.endereco); // Decifra o endereço
        return user;
    }
    return null; // Retorna null se o usuário não for encontrado
}


// Buscar usuário por CPF ou email
export async function getUserByCpfOrEmail(cpf, email) {
    const comando = `
        SELECT id_usuario 
        FROM tb_usuarios 
        WHERE cpf = ? OR email = ?;
    `;
    const [rows] = await connection.query(comando, [encrypt(cpf), encrypt(email)]);
    return rows.length > 0; // Retorna true se encontrar algum usuário
}

// Atualizar senha de um usuário
export async function updatePassword(userId, newPasswordHash) {
    const comando = `
        UPDATE tb_usuarios
        SET senha_hash = ?
        WHERE id_usuario = ?;
    `;
    await connection.query(comando, [newPasswordHash, userId]);
}
