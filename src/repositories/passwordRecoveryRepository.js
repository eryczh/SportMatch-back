import connection from '../db/connection.js';

// Criar um código de recuperação
export async function createRecoveryCode(userId, code) {
    const comando = `
        INSERT INTO password_recovery (user_id, code)
        VALUES (?, ?);
    `;
    const [result] = await connection.query(comando, [userId, code]);
    return result.insertId;
}

// Buscar código de recuperação válido
export async function getValidRecoveryCode(userId, code) {
    const comando = `
        SELECT * 
        FROM password_recovery
        WHERE user_id = ? AND code = ? AND TIMESTAMPDIFF(MINUTE, created_at, NOW()) <= 15;
    `;
    const [rows] = await connection.query(comando, [userId, code]);
    return rows[0]; // Retorna apenas o primeiro resultado
}

// Excluir códigos de recuperação antigos para o usuário
export async function deleteOldRecoveryCodes(userId) {
    const comando = `
        DELETE FROM password_recovery WHERE user_id = ?;
    `;
    await connection.query(comando, [userId]);
}
