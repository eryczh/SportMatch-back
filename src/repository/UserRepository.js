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

export async function realizarLogin(usuario, senha) {
  const comando = `
    SELECT id_login AS id, usuario, tipo_usuario AS tipoUsuario
    FROM tb_login
    WHERE usuario = ? AND senha = ?
  `;

  const [linhas] = await con.query(comando, [usuario, senha]);
  return linhas[0]; // Retorna o login encontrado ou `undefined` se não encontrado
}

export async function editarConta(idUsuario, dados) {
  const comando = `
    UPDATE tb_usuarios
    SET 
      nome = ?, cpf = ?, data_nascimento = ?, estado = ?, cidade = ?, 
      email = ?, endereco = ?, instagram = ?, esportes_favoritos = ?, 
      foto_perfil = ?
    WHERE id_usuario = ?
  `;

  const [result] = await con.query(comando, [
    dados.nome, dados.cpf, dados.dataNascimento, dados.estado, dados.cidade,
    dados.email, dados.endereco, dados.instagram, dados.esportesFavoritos,
    dados.fotoPerfil, idUsuario
  ]);

  return result.affectedRows > 0; // Retorna `true` se alguma linha foi afetada
}
