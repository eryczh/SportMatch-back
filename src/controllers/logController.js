import { saveLog } from '../repositories/logRepository.js';

export async function logAction(descricao, usuario, tipo, status) {
    await saveLog({ descricao, usuario, tipo, status });
}
