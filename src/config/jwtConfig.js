import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET; // Use uma chave segura e longa
const EXPIRATION_TIME = '2h'; // Tempo de validade do token

// Gerar um token JWT
export function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
}

// Verificar e decodificar o token JWT
export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Token inválido ou expirado.');
    }
}
