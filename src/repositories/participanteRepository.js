import connection from '../db/connection.js';

export async function addParticipante(participante) {
    const comando = `
        INSERT INTO tb_participantes (id_partida, id_usuario, status) 
        VALUES (?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        participante.id_partida, participante.id_usuario, participante.status
    ]);
    participante.id_participante = result.insertId;
    return participante;
}

export async function updateParticipante(id, status) {
    const comando = `
        UPDATE tb_participantes 
        SET status = ? 
        WHERE id_participante = ?;
    `;
    await connection.query(comando, [status, id]);
}

export async function removeParticipante(id) {
    const comando = `DELETE FROM tb_participantes WHERE id_participante = ?;`;
    await connection.query(comando, [id]);
}

export async function listParticipantesByPartida(id_partida) {
    const comando = `SELECT * FROM tb_participantes WHERE id_partida = ?;`;
    const [rows] = await connection.query(comando, [id_partida]);
    return rows;
}
