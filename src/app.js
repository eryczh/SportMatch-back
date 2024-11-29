import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Importando rotas
import userRoutes from './routes/userRoutes.js';
import quadraRoutes from './routes/quadraRoutes.js';
import partidaRoutes from './routes/partidaRoutes.js';
import participanteRoutes from './routes/participanteRoutes.js';
import notificacaoRoutes from './routes/notificacaoRoutes.js';
import avaliacaoRoutes from './routes/avaliacaoRoutes.js';
import logRoutes from './routes/logRoutes.js';
import encryptionConfig from './config/encryption.js';

//console.log('Chave de Criptografia:', encryptionConfig.key);
//console.log('IV:', encryptionConfig.iv);

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas principais
app.use('/usuarios', userRoutes);
app.use('/quadras', quadraRoutes);
app.use('/partidas', partidaRoutes);
app.use('/participantes', participanteRoutes);
app.use('/notificacoes', notificacaoRoutes);
app.use('/avaliacoes', avaliacaoRoutes);
app.use('/logs', logRoutes);

app.use('/storage/perfil', express.static('storage/perfil'));
app.use('/storage/quadras', express.static('storage/quadras'));

// Rota raiz
app.get('/', (req, res) => {
    res.send('API do SportsMatch está rodando!');
});

// Configuração da porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
