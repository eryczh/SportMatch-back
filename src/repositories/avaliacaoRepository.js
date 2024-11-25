import connection from '../db/connection.js';

export async function addAvaliacao(avaliacao) {
    const comando = `
        INSERT INTO tb_avaliacoes (id_usuario, id_quadra, nota, comentario) 
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        avaliacao.id_usuario, avaliacao.id_quadra, avaliacao.nota, avaliacao.comentario
    ]);
    avaliacao.id_avaliacao = result.insertId;
    return avaliacao;
}

export async function updateAvaliacao(id, nota, comentario) {
    const comando = `
        UPDATE tb_avaliacoes 
        SET nota = ?, comentario = ? 
        WHERE id_avaliacao = ?;
    `;
    await connection.query(comando, [nota, comentario, id]);
}

export async function deleteAvaliacao(id) {
    const comando = `DELETE FROM tb_avaliacoes WHERE id_avaliacao = ?;`;
    await connection.query(comando, [id]);
}

export async function listAvaliacoesByQuadra(id_quadra) {
    const comando = `SELECT * FROM tb_avaliacoes WHERE id_quadra = ?;`;
    const [rows] = await connection.query(comando, [id_quadra]);
    return rows;
}
