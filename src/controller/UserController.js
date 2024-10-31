import UserRepository from './UserRepository';

class UserController {
    async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await UserRepository.findById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário', error });
        }
    }

    async createUser(req, res) {
        const user = req.body;

        try {
            const userId = await UserRepository.createUser(user);
            res.status(201).json({ message: 'Usuário criado com sucesso', userId });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário', error });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const user = req.body;

        try {
            const affectedRows = await UserRepository.updateUser(id, user);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Usuário atualizado com sucesso' });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const affectedRows = await UserRepository.deleteUser(id);
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Usuário deletado com sucesso' });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar usuário', error });
        }
    }
}

export default new UserController();
