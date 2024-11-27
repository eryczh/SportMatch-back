import connection from '../db/connection.js';

export async function addAvaliacao(avaliacao) {
    
    try {
        const comando = `
            INSERT INTO tb_avaliacoes (id_usuario, id_quadra, nota, comentario) 
            VALUES (?, ?, ?, ?);
        `;
        const [result] = await connection.query(comando, [
            avaliacao.id_usuario,
            avaliacao.id_quadra,
            avaliacao.nota,
            avaliacao.comentario,
        ]);
        avaliacao.id_avaliacao = result.insertId;
        return avaliacao;
    } catch (error) {
        console.error('Erro ao adicionar avaliação no banco:', error);
        throw new Error('Erro no banco de dados.');
    }


    /*
    const comando = `
        INSERT INTO tb_avaliacoes (id_usuario, id_quadra, nota, comentario) 
        VALUES (?, ?, ?, ?);
    `;
        avaliacao.id_usuario, 
        avaliacao.id_quadra, 
        avaliacao.nota, 
        avaliacao.comentario
    ]);
    avaliacao.id_avaliacao = result.insertId;
    return avaliacao;
    */
}

export async function updateAvaliacao(id, nota, comentario) {

    try {
        const comando = `
            UPDATE tb_avaliacoes 
            SET nota = ?, comentario = ? 
            WHERE id_avaliacao = ?;
        `;
        await connection.query(comando, [nota, comentario, id]);
    } catch (error) {
        console.error('Erro ao atualizar avaliação no banco:', error);
        throw new Error('Erro ao atualizar avaliação no banco de dados.');
    }
    /*
    const comando = `
        UPDATE tb_avaliacoes 
        SET nota = ?, comentario = ? 
        WHERE id_avaliacao = ?;
    `;
    await connection.query(comando, [nota, comentario, id]);
    */
}

export async function deleteAvaliacao(id) {

    try {
        const comando = `DELETE FROM tb_avaliacoes WHERE id_avaliacao = ?;`;
        await connection.query(comando, [id]);
    } catch (error) {
        console.error('Erro ao deletar avaliação no banco:', error);
        throw new Error('Erro ao deletar avaliação no banco de dados.');
    }

    /*
    const comando = `DELETE FROM tb_avaliacoes WHERE id_avaliacao = ?;`;
    await connection.query(comando, [id]);
    */
}

export async function listAvaliacoesByQuadra(id_quadra) {

    try {
        const comando = `SELECT * FROM tb_avaliacoes WHERE id_quadra = ?;`;
        const [rows] = await connection.query(comando, [id_quadra]);
        return rows;
    } catch (error) {
        console.error('Erro ao listar avaliações no banco:', error);
        throw new Error('Erro ao listar avaliações no banco de dados.');
    }
    /*
    const comando = `SELECT * FROM tb_avaliacoes WHERE id_quadra = ?;`;
    const [rows] = await connection.query(comando, [id_quadra]);
    return rows;
    */
}
