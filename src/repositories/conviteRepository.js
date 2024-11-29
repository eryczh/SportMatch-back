import connection from '../db/connection.js';

// Adicionar convite
export async function addConvite(convite) {
    const comando = `
        INSERT INTO tb_convites (id_partida, id_criador, id_jogador, mensagem) 
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        convite.id_partida,
        convite.id_criador,
        convite.id_jogador,
        convite.mensagem || null
    ]);
    convite.id_convite = result.insertId;
    return convite;
}

// Buscar convites por ID do jogador convidado
export async function getConviteByJogador(id_jogador) {
    const comando = `
        SELECT 
            c.id_convite, 
            c.id_partida, 
            c.id_criador, 
            c.id_jogador, 
            c.mensagem,
            c.status,
            q.nome AS nome_quadra,
            u.nome AS nome_criador
        FROM tb_convites c
        JOIN tb_partidas p ON c.id_partida = p.id_partida
        JOIN tb_quadras q ON p.id_quadra = q.id_quadra
        JOIN tb_usuarios u ON c.id_criador = u.id_usuario
        WHERE c.id_jogador = ?;
    `;
    const [rows] = await connection.query(comando, [id_jogador]);
    return rows;
}


// Remover convite
export async function removeConvite(id) {
    const comando = `
        DELETE FROM tb_convites WHERE id_convite = ?;
    `;
    await connection.query(comando, [id]);
}

export async function updateConviteStatus(id, status) {
    const comando = `
        UPDATE tb_convites 
        SET status = ?
        WHERE id_convite = ?;
    `;
    await connection.query(comando, [status, id]);
}