import multer from 'multer';
import path from 'path';

// Definição do armazenamento dos arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'quadras/'); // Pasta onde as imagens das quadras serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname); // Extensão do arquivo
        cb(null, `${file.originalname}-${uniqueSuffix}${ext}`);
    },
});

// Configuração do multer para upload de arquivos
const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // Limite de 15 megabytes por arquivo
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true); // Aceita o arquivo
        } else {
            cb(new Error('Apenas imagens (JPEG, JPG, PNG) são permitidas.')); // Rejeita o arquivo
        }
    },
});

export default upload;