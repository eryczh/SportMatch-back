Create DATABASE db_sportmatch;
USE db_sportmatch;

-- Tabela de Login
CREATE TABLE tb_login (
id_login INT PRIMARY KEY AUTO_INCREMENT,
usuario VARCHAR(100) NOT NULL,
senha VARCHAR(100) NOT NULL,
tipo_usuario BOOLEAN NOT NULL
);

-- Tabela de Usuários
CREATE TABLE tb_usuarios (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
id_login INT NOT NULL UNIQUE,
nome VARCHAR(100) NOT NULL,
cpf VARCHAR(14) NOT NULL,
data_nascimento DATE NOT NULL,
estado VARCHAR(50) NOT NULL,
cidade VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
endereco VARCHAR(255),  -- Somente para jogadores
instagram VARCHAR(100),  -- Opcional
esportes_favoritos VARCHAR(255),  -- Somente para jogadores
foto_perfil VARCHAR(255),
FOREIGN KEY (id_login) REFERENCES tb_login(id_login)
);

-- Tabela de Quadras
CREATE TABLE tb_quadras (
id_quadra INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
descricao TEXT NOT NULL,
tipo VARCHAR(50) NOT NULL,
endereco VARCHAR(255) NOT NULL,
id_gestor INT NOT NULL,
preco DECIMAL(10,2) NOT NULL,
esportes_permitidos VARCHAR(255),
FOREIGN KEY (id_gestor) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Imagens das Quadras
CREATE TABLE tb_quadras_imagens (
    id_imagem INT PRIMARY KEY AUTO_INCREMENT,
    id_quadra INT NOT NULL,
    url_imagem VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    data_inclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_quadra) REFERENCES tb_quadras(id_quadra)
);

-- Tabela de Tags de Esportes
CREATE TABLE tb_tags_esportes (
id_esporte INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
jogadores_minimos INT NOT NULL,
jogadores_maximos INT NOT NULL
);

-- Tabela de Partidas
CREATE TABLE tb_partidas (
id_partida INT PRIMARY KEY AUTO_INCREMENT,
id_quadra INT NOT NULL,
id_criador INT NOT NULL,
privada BOOLEAN NOT NULL,
data DATE NOT NULL,
hora_inicio TIME NOT NULL,
duracao INT NOT NULL,
status VARCHAR(20) NOT NULL,
jogadores_maximos INT NOT NULL,
jogadores_minimos INT NOT NULL,
taxa_total DECIMAL(10,2) NOT NULL,
taxa_por_participante DECIMAL(10,2) NOT NULL,
id_tag_esporte INT NOT NULL,
FOREIGN KEY (id_quadra) REFERENCES tb_quadras(id_quadra),
FOREIGN KEY (id_criador) REFERENCES tb_usuarios(id_usuario),
FOREIGN KEY (id_tag_esporte) REFERENCES tb_tags_esportes(id_esporte)
);

-- Tabela de Convites para Partidas
CREATE TABLE tb_convites_partidas (
id_convite INT PRIMARY KEY AUTO_INCREMENT,
id_partida INT NOT NULL,
id_remetente INT NOT NULL,
id_destinatario INT NOT NULL,
status VARCHAR(20) NOT NULL,
data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_partida) REFERENCES tb_partidas(id_partida),
FOREIGN KEY (id_remetente) REFERENCES tb_usuarios(id_usuario),
FOREIGN KEY (id_destinatario) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Notificações
CREATE TABLE tb_notificacoes (
    id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,               -- Usuário a ser notificado
    tipo VARCHAR(50) NOT NULL,              -- Tipo da notificação (ex: 'Convite', 'Mudança de Quadra', 'Mudança de Partida')
    mensagem TEXT NOT NULL,                 -- Mensagem descritiva da notificação
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_lido BOOLEAN DEFAULT FALSE,      -- Status de leitura: lido ou não lido
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Logs
CREATE TABLE tb_logs (
id_log INT AUTO_INCREMENT PRIMARY KEY,
descricao VARCHAR(255) NOT NULL,
usuario VARCHAR(50) NULL,
data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
tipo VARCHAR(50) NOT NULL, -- Tipo do log (ex: 'ERRO', 'INFO', 'AVISO')
status VARCHAR(50) NULL -- Status da execução (ex: 'SUCESSO', 'FALHA')
);

-- Inserir dados na tabela Login
INSERT INTO tb_login (usuario, senha, tipo_usuario) VALUES 
('gestor1', 'senha123', TRUE),     -- Gestor
('jogador1', 'senha456', FALSE),    -- Jogador
('jogador2', 'senha789', FALSE);    -- Jogador

-- Inserir dados na tabela Usuários
INSERT INTO tb_usuarios (id_login, nome, cpf, data_nascimento, estado, cidade, email, endereco, instagram, esportes_favoritos, foto_perfil) VALUES 
(1, 'Carlos Silva', '123.456.789-00', '1985-02-20', 'São Paulo', 'São Paulo', 'carlos@gmail.com', NULL, 'carlos_silva', NULL, 'https://example.com/fotos/carlos.jpg'),
(2, 'Ana Souza', '987.654.321-11', '1992-07-12', 'Rio de Janeiro', 'Rio de Janeiro', 'ana.souza@gmail.com', 'Rua A, 123', NULL, 'Futebol, Vôlei', 'https://example.com/fotos/ana.jpg'),
(3, 'Pedro Lima', '456.789.123-22', '1995-03-18', 'Minas Gerais', 'Belo Horizonte', 'pedro.lima@gmail.com', 'Rua B, 456', '@pedro.lima', 'Basquete', 'https://example.com/fotos/pedro.jpg');

-- Inserir dados na tabela Quadras
INSERT INTO tb_quadras (nome, descricao, tipo, endereco, id_gestor, preco, esportes_permitidos) VALUES 
('Quadra Central', 'Quadra poliesportiva coberta', 'Poliesportiva', 'Av. Central, 1000', 1, 50.00, 'Futebol, Basquete, Vôlei'),
('Quadra Sul', 'Quadra de futebol de areia', 'Areia', 'Rua das Palmeiras, 300', 1, 70.00, 'Futebol');

-- Inserir dados com várias imagens para uma mesma quadra
INSERT INTO tb_quadras_imagens (id_quadra, url_imagem, descricao) VALUES 
(1, 'https://example.com/fotos/quadra_central1.jpg', 'Visão geral da quadra'),
(1, 'https://example.com/fotos/quadra_central2.jpg', 'Vista lateral'),
(2, 'https://example.com/fotos/quadra_sul1.jpg', 'Entrada principal'),
(2, 'https://example.com/fotos/quadra_sul2.jpg', 'Área de jogo');

-- Inserir dados na tabela Tags_Esportes
INSERT INTO tb_tags_esportes (nome, jogadores_minimos, jogadores_maximos) VALUES 
('Futebol', 10, 22),
('Basquete', 6, 10),
('Vôlei', 6, 12);

-- Inserir dados na tabela Partidas
INSERT INTO tb_partidas (id_quadra, id_criador, privada, data, hora_inicio, duracao, status, jogadores_maximos, jogadores_minimos, taxa_total, taxa_por_participante, id_tag_esporte) VALUES 
(1, 2, FALSE, '2023-11-01', '15:00:00', 90, 'Agendada', 20, 10, 100.00, 10.00, 1),
(2, 3, TRUE, '2023-11-05', '10:00:00', 60, 'Agendada', 12, 6, 70.00, 7.00, 2);

-- Inserir dados na tabela Convites_Partidas
INSERT INTO tb_convites_partidas (id_partida, id_remetente, id_destinatario, status) VALUES 
(1, 2, 3, 'Pendente'),
(2, 3, 2, 'Aceito');

-- Inserir dados na tabela Logs
INSERT INTO tb_logs (descricao, usuario, tipo, status) VALUES 
('Login efetuado com sucesso', 'gestor1', 'INFO', 'SUCESSO'),
('Tentativa de login falhou', 'jogador1', 'ERRO', 'FALHA'),
('Partida criada com sucesso', 'jogador2', 'INFO', 'SUCESSO');

