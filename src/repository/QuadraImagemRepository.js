import con from "./connection.js";

export async function salvarImagemQuadra(imagem) {
  const comando = `
    INSERT INTO tb_quadras_imagens (id_quadra, url_imagem, descricao)
    VALUES (?, ?, ?)
  `;

  const [result] = await con.query(comando, [imagem.idQuadra, imagem.urlImagem, imagem.descricao]);
  imagem.id = result.insertId;
  return imagem;
}

export async function listarImagensPorQuadra(idQuadra) {
  const comando = `
    SELECT id_imagem AS id, id_quadra AS idQuadra, url_imagem AS urlImagem, descricao, data_inclusao AS dataInclusao
    FROM tb_quadras_imagens
    WHERE id_quadra = ?
  `;

  const [linhas] = await con.query(comando, [idQuadra]);
  return linhas;
}

export async function removerImagem(id) {
  const comando = `
    DELETE FROM tb_quadras_imagens WHERE id_imagem = ?
  `;

  const [result] = await con.query(comando, [id]);
  return result.affectedRows;
}
