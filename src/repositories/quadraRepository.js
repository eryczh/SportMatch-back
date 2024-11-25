import connection from '../db/connection.js';

// Criar uma quadra
export async function createQuadra(quadra) {
    const comando = `
        INSERT INTO tb_quadras 
        (id_administrador, nome, cep, endereco, cidade, estado, descricao, modalidades)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connection.query(comando, [
        quadra.id_administrador, quadra.nome, quadra.cep, quadra.endereco,
        quadra.cidade, quadra.estado, quadra.descricao, quadra.modalidades
    ]);
    quadra.id_quadra = result.insertId;
    return quadra;
}

// Atualizar dados de uma quadra
export async function updateQuadra(id, quadra) {
    const comando = `
        UPDATE tb_quadras
        SET nome = ?, descricao = ?, modalidades = ?
        WHERE id_quadra = ? AND id_administrador = ?;
    `;
    const [result] = await connection.query(comando, [
        quadra.nome, quadra.descricao, quadra.modalidades,
        id, quadra.id_administrador
    ]);
    return result.affectedRows;
}

// Excluir quadra
export async function deleteQuadra(id, id_administrador) {
    const comando = `
        DELETE FROM tb_quadras 
        WHERE id_quadra = ? AND id_administrador = ?;
    `;
    const [result] = await connection.query(comando, [id, id_administrador]);
    return result.affectedRows;
}

// Listar quadras por administrador
export async function listQuadrasByAdmin(id_administrador) {
    const comando = `
        SELECT * FROM tb_quadras 
        WHERE id_administrador = ?;
    `;
    const [rows] = await connection.query(comando, [id_administrador]);
    return rows;
}

// Listar todas as quadras
export async function listAllQuadras() {
    const comando = `
        SELECT * FROM tb_quadras;
    `;
    const [rows] = await connection.query(comando);
    return rows;
}

// Verificar disponibilidade de quadra
export async function checkQuadraAvailability(id_quadra, data) {
    const comando = `
        SELECT COUNT(*) AS partidas_vinculadas
        FROM tb_partidas
        WHERE id_quadra = ? AND DATE(data_horario) = ?;
    `;
    const [rows] = await connection.query(comando, [id_quadra, data]);
    return rows[0].partidas_vinculadas === 0; // Retorna true se disponível
}
