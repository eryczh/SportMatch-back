import connection from '../db/connection.js';

export async function saveLog(log) {
    const comando = `
        INSERT INTO tb_logs (descricao, usuario, tipo, status)
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        log.descricao, log.usuario, log.tipo, log.status
    ]);
    log.id = result.insertId;
    return log;
}
