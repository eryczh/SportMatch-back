CREATE DATABASE sportsmatch;

USE sportsmatch;

-- Tabela de Usuários
CREATE TABLE tb_usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(64) NOT NULL UNIQUE, -- CPF armazenado criptografado
    email VARCHAR(256) NOT NULL UNIQUE, -- Email armazenado criptografado
    celular VARCHAR(64), -- Celular armazenado criptografado
    cep VARCHAR(64), -- CEP armazenado criptografado
    endereco VARCHAR(512), -- Endereço armazenado criptografado
    cidade VARCHAR(100),
    estado VARCHAR(50),
    senha_hash VARCHAR(255) NOT NULL, -- Senha armazenada como hash
    foto_perfil VARCHAR(255),
    tipo ENUM('jogador', 'administrador') NOT NULL
);

-- Tabela de Login (Logs de Login)
CREATE TABLE tb_login (
    id_login INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    data_hora_login DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Quadras
CREATE TABLE tb_quadras (
    id_quadra INT AUTO_INCREMENT PRIMARY KEY,
    id_administrador INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    descricao TEXT,
    modalidades TEXT, -- Esportes permitidos (Ex: "Futebol, Basquete")
    FOREIGN KEY (id_administrador) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Imagens de Quadras
CREATE TABLE tb_quadras_imagens (
    id_imagem INT AUTO_INCREMENT PRIMARY KEY,
    id_quadra INT NOT NULL,
    url_imagem VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_quadra) REFERENCES tb_quadras(id_quadra)
);

-- Tabela de Partidas
CREATE TABLE tb_partidas (
    id_partida INT AUTO_INCREMENT PRIMARY KEY,
    id_quadra INT NOT NULL,
    id_criador INT NOT NULL,
    data_horario DATETIME NOT NULL,
    max_jogadores INT NOT NULL,
    status ENUM('pendente', 'agendada', 'cancelada') DEFAULT 'pendente',
    FOREIGN KEY (id_quadra) REFERENCES tb_quadras(id_quadra),
    FOREIGN KEY (id_criador) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Participantes
CREATE TABLE tb_participantes (
    id_participante INT AUTO_INCREMENT PRIMARY KEY,
    id_partida INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_partida) REFERENCES tb_partidas(id_partida),
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Avaliações
CREATE TABLE tb_avaliacoes (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_quadra INT NOT NULL,
    nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario),
    FOREIGN KEY (id_quadra) REFERENCES tb_quadras(id_quadra)
);

-- Tabela de Notificações
CREATE TABLE tb_notificacoes (
    id_notificacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
);

-- Tabela de Logs do Sistema
CREATE TABLE tb_logs (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    usuario INT,
    tipo VARCHAR(100),
    status VARCHAR(50),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario) REFERENCES tb_usuarios(id_usuario)
);

CREATE TABLE tb_convites (
    id_convite INT AUTO_INCREMENT PRIMARY KEY,       -- Identificador único do convite
    id_partida INT NOT NULL,                         -- Referência para a partida relacionada
    id_criador INT NOT NULL,                         -- Usuário que enviou o convite
    id_jogador INT NOT NULL,                         -- Usuário convidado
    mensagem TEXT,                                   -- Mensagem opcional no convite
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data de criação do convite
    status ENUM('pendente', 'aceito', 'recusado') DEFAULT 'pendente', -- Status do convite
    FOREIGN KEY (id_partida) REFERENCES tb_partidas(id_partida), -- Chave estrangeira para partidas
    FOREIGN KEY (id_criador) REFERENCES tb_usuarios(id_usuario), -- Chave estrangeira para criador
    FOREIGN KEY (id_jogador) REFERENCES tb_usuarios(id_usuario)  -- Chave estrangeira para jogador
);