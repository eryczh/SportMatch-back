import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const exit = path.extname(file.originalname);
        cb(null, `${file.filename}-${uniqueSuffix}${ext}`);
    },
});

const upload = multer({
    storage, 
    limits: { fileSize: 15 * 1024 * 1024}, // Limite de 15 megas
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Apenas imagens (JPEG, JPG, PNG) são permitidas.'));
        }
    },
});

export default upload;