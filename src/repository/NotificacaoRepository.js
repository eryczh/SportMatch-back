import con from './connection.js';

export async function criarNotificacao(notificacao) {
    const comando = `
        INSERT INTO tb_notificacoes (id_usuario, tipo, mensagem, status_lido)
        VALUES (?, ?, ?, ?)
    `;
    const [info] = await con.query(comando, [
        notificacao.id_usuario,
        notificacao.tipo,
        notificacao.mensagem,
        notificacao.status_lido || false
    ]);

    notificacao.id_notificacao = info.insertId;
    return notificacao;
}

export async function listarNotificacoesPorUsuario(idUsuario) {
    const comando = `
        SELECT 
            id_notificacao AS id,
            tipo,
            mensagem,
            data_criacao AS dataCriacao,
            status_lido AS statusLido
        FROM tb_notificacoes
        WHERE id_usuario = ?
        ORDER BY data_criacao DESC
    `;
    const [linhas] = await con.query(comando, [idUsuario]);
    return linhas;
}

export async function atualizarStatusLido(idNotificacao, lido) {
    const comando = `
        UPDATE tb_notificacoes
        SET status_lido = ?
        WHERE id_notificacao = ?
    `;
    const [info] = await con.query(comando, [lido, idNotificacao]);
    return info.affectedRows > 0;
}

export async function removerNotificacao(idNotificacao) {
    const comando = `
        DELETE FROM tb_notificacoes
        WHERE id_notificacao = ?
    `;
    const [info] = await con.query(comando, [idNotificacao]);
    return info.affectedRows > 0;
}
