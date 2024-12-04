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

export async function listPartidasByAdmin(id_administrador) {
    const comando = `
        SELECT 
            p.id_partida,
            p.id_quadra,
            p.id_criador,
            p.data_horario,
            p.max_jogadores,
            p.status,
            q.nome AS quadra_nome,
            u.nome AS criador_nome
        FROM tb_partidas p
        JOIN tb_quadras q ON p.id_quadra = q.id_quadra
        JOIN tb_usuarios u ON p.id_criador = u.id_usuario
        WHERE q.id_administrador = ?;
    `;
    const [rows] = await connection.query(comando, [id_administrador]);
    return rows;
}

export async function updatePartidaStatus(id_partida, status) {
    const comando = `
        UPDATE tb_partidas
        SET status = ?
        WHERE id_partida = ?;
    `;
    const [result] = await connection.query(comando, [status, id_partida]);
    return result.affectedRows;
}

export async function listPartidasParticipadasByUser(id_usuario) {
    const comando = `
        SELECT 
            p.id_partida,
            p.id_quadra,
            p.data_horario,
            p.max_jogadores,
            p.status,
            q.nome AS quadra_nome,
            p.id_criador,
            q.endereco AS quadra_endereco,
            u.nome AS criador_nome
        FROM tb_participantes par
        INNER JOIN tb_partidas p ON par.id_partida = p.id_partida
        INNER JOIN tb_quadras q ON p.id_quadra = q.id_quadra
        INNER JOIN tb_usuarios u ON p.id_criador = u.id_usuario
        WHERE par.id_usuario = ?;
    `;
    const [rows] = await connection.query(comando, [id_usuario]);
    return rows;
}

export async function listPartidasDisponiveis(id_quadra, data) {
    const comando = `
        SELECT 
            p.data_horario
        FROM tb_partidas p
        WHERE p.id_quadra = ? AND DATE(p.data_horario) = ?;
    `;
    const [rows] = await connection.query(comando, [id_quadra, data]);
    return rows;
}

