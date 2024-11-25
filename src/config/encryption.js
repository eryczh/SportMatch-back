import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config(); // Certifique-se de que as variáveis do .env estão sendo carregadas

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ENCRYPTION_IV = process.env.ENCRYPTION_IV;

if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
    throw new Error('Chave ou IV de criptografia não definidos. Verifique o arquivo .env');
}

export default {
    key: Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv: Buffer.from(ENCRYPTION_IV, 'hex'),
};
