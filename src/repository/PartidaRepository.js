import con from "./connection.js";

export async function salvarPartida(partida) {
  const comando = `
    INSERT INTO tb_partidas (id_quadra, id_criador, privada, data, hora_inicio, duracao, status, jogadores_maximos, jogadores_minimos, taxa_total, taxa_por_participante, id_tag_esporte)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await con.query(comando, [
    partida.idQuadra, partida.idCriador, partida.privada, partida.data, partida.horaInicio, 
    partida.duracao, partida.status, partida.jogadoresMaximos, partida.jogadoresMinimos, 
    partida.taxaTotal, partida.taxaPorParticipante, partida.idTagEsporte
  ]);

  partida.id = result.insertId;
  return partida;
}

export async function listarPartidas() {
  const comando = `
    SELECT 
      id_partida AS id, id_quadra AS idQuadra, id_criador AS idCriador, privada, data, 
      hora_inicio AS horaInicio, duracao, status, jogadores_maximos AS jogadoresMaximos, 
      jogadores_minimos AS jogadoresMinimos, taxa_total AS taxaTotal, 
      taxa_por_participante AS taxaPorParticipante, id_tag_esporte AS idTagEsporte
    FROM tb_partidas
  `;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPartidaPorId(id) {
  const comando = `
    SELECT 
      id_partida AS id, id_quadra AS idQuadra, id_criador AS idCriador, privada, data, 
      hora_inicio AS horaInicio, duracao, status, jogadores_maximos AS jogadoresMaximos, 
      jogadores_minimos AS jogadoresMinimos, taxa_total AS taxaTotal, 
      taxa_por_participante AS taxaPorParticipante, id_tag_esporte AS idTagEsporte
    FROM tb_partidas
    WHERE id_partida = ?
  `;

  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}
