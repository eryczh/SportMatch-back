import con from "./connection.js";

export async function salvarLogin(login) {
  const comando = `
    INSERT INTO tb_login (usuario, senha, tipo_usuario)
    VALUES (?, ?, ?)
  `;
  
  const [result] = await con.query(comando, [login.usuario, login.senha, login.tipoUsuario]);
  login.id = result.insertId;
  return login;
}

export async function buscarLoginPorUsuario(usuario) {
  const comando = `
    SELECT id_login AS id, usuario, senha, tipo_usuario AS tipoUsuario
    FROM tb_login
    WHERE usuario = ?
  `;

  const [linhas] = await con.query(comando, [usuario]);
  return linhas[0];
}

export async function removerLogin(id) {
  const comando = `
    DELETE FROM tb_login WHERE id_login = ?
  `;

  const [result] = await con.query(comando, [id]);
  return result.affectedRows;
}
