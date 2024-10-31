import LoginRepository from './LoginRepository';

class LoginController {
    async login(req, res) {
        const { username, password } = req.body;
        
        try {
            const user = await LoginRepository.validateUser(username, password);
            if (user) {
                res.status(200).json({ message: 'Login realizado com sucesso', user });
            } else {
                res.status(401).json({ message: 'Usuário ou senha incorretos' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor', error });
        }
    }

    async register(req, res) {
        const { username, password, tipoUsuario } = req.body;

        try {
            const existingUser = await LoginRepository.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }

            const userId = await LoginRepository.createUser(username, password, tipoUsuario);
            res.status(201).json({ message: 'Usuário registrado com sucesso', userId });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário', error });
        }
    }
}

export default new LoginController();
