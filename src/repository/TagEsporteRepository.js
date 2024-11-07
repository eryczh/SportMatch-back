import con from "./connection.js";

export async function salvarTagEsporte(tag) {
  const comando = `
    INSERT INTO tb_tags_esportes (nome, jogadores_minimos, jogadores_maximos)
    VALUES (?, ?, ?)
  `;

  const [result] = await con.query(comando, [tag.nome, tag.jogadoresMinimos, tag.jogadoresMaximos]);
  tag.id = result.insertId;
  return tag;
}

export async function listarTagsEsportes() {
  const comando = `
    SELECT id_esporte AS id, nome, jogadores_minimos AS jogadoresMinimos, jogadores_maximos AS jogadoresMaximos
    FROM tb_tags_esportes
  `;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarTagEsportePorId(id) {
  const comando = `
    SELECT id_esporte AS id, nome, jogadores_minimos AS jogadoresMinimos, jogadores_maximos AS jogadoresMaximos
    FROM tb_tags_esportes
    WHERE id_esporte = ?
  `;

  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}
