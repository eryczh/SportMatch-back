import connection from '../db/connection.js';

export async function createNotificacao(notificacao) {
    const comando = `
        INSERT INTO tb_notificacoes (id_usuario, mensagem, tipo, lida) 
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        notificacao.id_usuario, notificacao.mensagem, notificacao.tipo, notificacao.lida
    ]);
    notificacao.id_notificacao = result.insertId;
    return notificacao;
}

export async function markNotificacaoAsRead(id) {
    const comando = `
        UPDATE tb_notificacoes 
        SET lida = 1 
        WHERE id_notificacao = ?;
    `;
    await connection.query(comando, [id]);
}

export async function deleteNotificacao(id) {
    const comando = `DELETE FROM tb_notificacoes WHERE id_notificacao = ?;`;
    await connection.query(comando, [id]);
}

export async function listNotificacoesByUser(id_usuario) {
    const comando = `SELECT * FROM tb_notificacoes WHERE id_usuario = ?;`;
    const [rows] = await connection.query(comando, [id_usuario]);
    return rows;
}
