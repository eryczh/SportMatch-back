import con from "./connection.js";

export async function salvarUsuario(usuario) {
  const comando = `
    INSERT INTO tb_usuarios (id_login, nome, cpf, data_nascimento, estado, cidade, email, endereco, instagram, esportes_favoritos, foto_perfil)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await con.query(comando, [
    usuario.idLogin, usuario.nome, usuario.cpf, usuario.dataNascimento,
    usuario.estado, usuario.cidade, usuario.email, usuario.endereco,
    usuario.instagram, usuario.esportesFavoritos, usuario.fotoPerfil
  ]);

  usuario.id = result.insertId;
  return usuario;
}

export async function listarUsuarios() {
  const comando = `
    SELECT 
      id_usuario AS id, nome, cpf, data_nascimento AS dataNascimento,
      estado, cidade, email, endereco, instagram, esportes_favoritos AS esportesFavoritos,
      foto_perfil AS fotoPerfil
    FROM tb_usuarios
  `;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarUsuarioPorId(id) {
  const comando = `
    SELECT 
      id_usuario AS id, nome, cpf, data_nascimento AS dataNascimento,
      estado, cidade, email, endereco, instagram, esportes_favoritos AS esportesFavoritos,
      foto_perfil AS fotoPerfil
    FROM tb_usuarios
    WHERE id_usuario = ?
  `;

  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}
