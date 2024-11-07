import con from "./connection.js";

export async function salvarQuadra(quadra) {
  const comando = `
    INSERT INTO tb_quadras (nome, descricao, tipo, endereco, id_gestor, preco, esportes_permitidos)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await con.query(comando, [
    quadra.nome, quadra.descricao, quadra.tipo, quadra.endereco,
    quadra.idGestor, quadra.preco, quadra.esportesPermitidos
  ]);

  quadra.id = result.insertId;
  return quadra;
}

export async function listarQuadras() {
  const comando = `
    SELECT 
      id_quadra AS id, nome, descricao, tipo, endereco,
      id_gestor AS idGestor, preco, esportes_permitidos AS esportesPermitidos
    FROM tb_quadras
  `;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarQuadraPorId(id) {
  const comando = `
    SELECT 
      id_quadra AS id, nome, descricao, tipo, endereco,
      id_gestor AS idGestor, preco, esportes_permitidos AS esportesPermitidos
    FROM tb_quadras
    WHERE id_quadra = ?
  `;

  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}
