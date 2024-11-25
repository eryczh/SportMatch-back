import connection from '../db/connection.js';

export async function createPartida(partida) {
    const comando = `
        INSERT INTO tb_partidas 
        (id_quadra, id_criador, data_horario, max_jogadores, status)
        VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        partida.id_quadra,
        partida.id_criador,
        partida.data_horario,
        partida.max_jogadores,
        'pendente'
    ]);

    partida.id_partida = result.insertId;

    // Insere automaticamente o criador como participante
    await connection.query(
        `INSERT INTO tb_participantes (id_partida, id_usuario) VALUES (?, ?);`,
        [partida.id_partida, partida.id_criador]
    );

    return partida;
}

export async function updatePartida(id, partida) {
    const comando = `
        UPDATE tb_partidas
        SET id_quadra = ?, data_horario = ?, max_jogadores = ?, status = ?
        WHERE id_partida = ?;
    `;
    const [result] = await connection.query(comando, [
        partida.id_quadra,
        partida.data_horario,
        partida.max_jogadores,
        partida.status,
        id,
    ]);
    return result.affectedRows;
}

export async function deletePartida(id) {
    // Remove os participantes associados
    await connection.query(`DELETE FROM tb_participantes WHERE id_partida = ?;`, [id]);

    const comando = `DELETE FROM tb_partidas WHERE id_partida = ?;`;
    const [result] = await connection.query(comando, [id]);
    return result.affectedRows;
}

export async function listPartidas() {
    const comando = `
        SELECT 
            p.*, 
            q.nome AS quadra_nome,
            q.endereco AS quadra_endereco
        FROM tb_partidas p
        JOIN tb_quadras q ON p.id_quadra = q.id_quadra;
    `;
    const [rows] = await connection.query(comando);
    return rows;
}

export async function listPartidasByUser(id_usuario) {
    const comando = `
        SELECT 
            p.*, 
            q.nome AS quadra_nome,
            q.endereco AS quadra_endereco
        FROM tb_partidas p
        JOIN tb_quadras q ON p.id_quadra = q.id_quadra
        WHERE p.id_criador = ?;
    `;
    const [rows] = await connection.query(comando, [id_usuario]);
    return rows;
}
