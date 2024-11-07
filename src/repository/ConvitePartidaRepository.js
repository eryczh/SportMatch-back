import con from "./connection.js";

export async function salvarConvite(convite) {
  const comando = `
    INSERT INTO tb_convites_partidas (id_partida, id_remetente, id_destinatario, status)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await con.query(comando, [convite.idPartida, convite.idRemetente, convite.idDestinatario, convite.status]);
  convite.id = result.insertId;
  return convite;
}

export async function listarConvitesPorPartida(idPartida) {
  const comando = `
    SELECT id_convite AS id, id_partida AS idPartida, id_remetente AS idRemetente, 
           id_destinatario AS idDestinatario, status, data_envio AS dataEnvio
    FROM tb_convites_partidas
    WHERE id_partida = ?
  `;

  const [linhas] = await con.query(comando, [idPartida]);
  return linhas;
}

export async function atualizarStatusConvite(id, status) {
  const comando = `
    UPDATE tb_convites_partidas
    SET status = ?
    WHERE id_convite = ?
  `;

  const [result] = await con.query(comando, [status, id]);
  return result.affectedRows;
}
