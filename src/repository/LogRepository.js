import con from "./connection.js";

export async function salvarLog(log) {
  const comando = `
    INSERT INTO tb_logs (descricao, usuario, tipo, status)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await con.query(comando, [log.descricao, log.usuario, log.tipo, log.status]);
  log.id = result.insertId;
  return log;
}

export async function listarLogs() {
  const comando = `
    SELECT id_log AS id, descricao, usuario, data_hora AS dataHora, tipo, status
    FROM tb_logs
    ORDER BY data_hora DESC
  `;

  const [linhas] = await con.query(comando);
  return linhas;
}
