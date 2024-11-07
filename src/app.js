import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import loginController from './controller/LoginController.js';
import usuarioController from './controller/UserController.js';
import quadraController from './controller/QuadraController.js';
import quadraImagemController from './controller/QuadraImagemController.js';
import tagEsporteController from './controller/TagEsporteController.js';
import partidaController from './controller/PartidaController.js';
import convitePartidaController from './controller/ConvitePartidaController.js';
import notificacaoController from './controller/NotificacaoController.js';
import logController from './controller/LogController.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(loginController);
servidor.use(usuarioController);
servidor.use(quadraController);
servidor.use(quadraImagemController);
servidor.use(tagEsporteController);
servidor.use(partidaController);
servidor.use(convitePartidaController);
servidor.use(notificacaoController);
servidor.use(logController);

servidor.use('/storage/perfil', express.static('storage/perfil'));
servidor.use('/storage/quadra', express.static('storage/quadra'));

let port = process.env.PORT || 3000;
servidor.listen(port, () => console.log(`API SUBIU na porta ${port}!`));
