import con from "./connection.js";

export const criarPartida = async (req, res) => {
  try {
    const {
      idQuadra,
      idCriador,
      privada,
      data,
      horaInicio,
      duracao,
      jogadoresMaximos,
      jogadoresMinimos,
      taxaPorParticipante,
      idTagEsporte,
    } = req.body;

    const comando = `
      INSERT INTO tb_partidas 
      (id_quadra, id_criador, privada, data, hora_inicio, duracao, 
       jogadores_maximos, jogadores_minimos, taxa_por_participante, id_tag_esporte, id_status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT id_status FROM tb_status_partidas WHERE descricao = 'Pendente'));
    `;

    const [result] = await con.query(comando, [
      idQuadra,
      idCriador,
      privada,
      data,
      horaInicio,
      duracao,
      jogadoresMaximos,
      jogadoresMinimos,
      taxaPorParticipante,
      idTagEsporte,
    ]);

    res.status(201).send({ idPartida: result.insertId, message: 'Partida criada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Erro ao criar a partida.' });
  }
};

export const participarPartida = async (idPartida, idJogador) => {
  try {
    const response = await axios.post(`${API_ADDRESS}/partidas/participar`, { idPartida, idJogador });
    return response.data;
  } catch (error) {
    getErrorMessage(error, 'Erro ao participar da partida');
  }
};

export const sairPartida = async (idPartida, idJogador) => {
  try {
    const response = await axios.post(`${API_ADDRESS}/partidas/sair`, { idPartida, idJogador });
    return response.data;
  } catch (error) {
    getErrorMessage(error, 'Erro ao sair da partida');
  }
};

export async function verificarPartidasDisponiveis() {
  const query = `
    SELECT 
      p.id_partida AS idPartida,
      p.id_quadra AS idQuadra,
      p.id_criador AS idCriador,
      p.data AS data,
      p.hora_inicio AS horaInicio,
      p.duracao AS duracao,
      p.jogadores_maximos AS jogadoresMaximos,
      p.jogadores_minimos AS jogadoresMinimos,
      p.taxa_por_participante AS taxaPorParticipante,
      e.nome AS esporte,
      s.descricao AS status
    FROM tb_partidas p
    JOIN tb_status_partidas s ON p.id_status = s.id_status
    JOIN tb_tags_esportes e ON p.id_tag_esporte = e.id_esporte
    WHERE s.descricao = 'Agendada'
  `;

  const [result] = await con.query(query);

  // Verificar se o resultado está vazio ou inválido
  if (!result || result.length === 0) {
    console.error("Nenhuma partida disponível foi encontrada.");
    return [];
  }

  // Validar cada item retornado
  const partidas = result.map((partida) => {
    if (!partida.status) {
      console.warn(`Partida com ID ${partida.idPartida} está sem status.`);
    }
    return partida;
  });

  return partidas;
}

export const verificarPartidasPorJogador = async (req, res) => {
  try {
    const { idJogador, status } = req.query;

    let comando = `
      SELECT p.* 
      FROM tb_partidas p
      JOIN tb_partidas_jogadores pj ON p.id_partida = pj.id_partida
      WHERE pj.id_jogador = ? AND pj.status = 'Confirmado';
    `;

    if (status) {
      comando += `
        AND p.id_status = (SELECT id_status FROM tb_status_partidas WHERE descricao = ?);
      `;
    }

    const [result] = await con.query(comando, status ? [idJogador, status] : [idJogador]);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Erro ao buscar partidas do jogador.' });
  }
};
