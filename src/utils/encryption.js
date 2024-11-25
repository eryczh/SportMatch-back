import crypto from 'crypto';
import config from '../config/encryption.js';

const ALGORITHM = 'aes-256-cbc';

export function encrypt(text) {
    const cipher = crypto.createCipheriv(ALGORITHM, config.key, config.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(ALGORITHM, config.key, config.iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
