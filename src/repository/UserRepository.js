import con from './con';

class UserRepository {
    async findById(id) {
        const [rows] = await con.execute(
            'SELECT * FROM tb_usuarios WHERE id_usuario = ?',
            [id]
        );
        return rows[0];
    }

    async findByLoginId(id_login) {
        const [rows] = await con.execute(
            'SELECT * FROM tb_usuarios WHERE id_login = ?',
            [id_login]
        );
        return rows[0];
    }

    async createUser(user) {
        const { id_login, nome, cpf, data_nascimento, estado, cidade, email, endereco, instagram, esportes_favoritos, foto_perfil } = user;
        const [result] = await con.execute(
            'INSERT INTO tb_usuarios (id_login, nome, cpf, data_nascimento, estado, cidade, email, endereco, instagram, esportes_favoritos, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_login, nome, cpf, data_nascimento, estado, cidade, email, endereco, instagram, esportes_favoritos, foto_perfil]
        );
        return result.insertId;
    }

    async updateUser(id, user) {
        const { nome, cpf, data_nascimento, estado, cidade, email, endereco, instagram, esportes_favoritos, foto_perfil } = user;
        const [result] = await con.execute(
            `UPDATE tb_usuarios SET 
                nome = ?, 
                cpf = ?, 
                data_nascimento = ?, 
                estado = ?, 
                cidade = ?, 
                email = ?, 
                endereco = ?, 
                instagram = ?, 
                esportes_favoritos = ?, 
                foto_perfil = ?
            WHERE id_usuario = ?`,
            [nome, cpf, data_nascimento, estado, cidade, email, endereco, instagram, esportes_favoritos, foto_perfil, id]
        );
        return result.affectedRows;
    }

    async deleteUser(id) {
        const [result] = await con.execute(
            'DELETE FROM tb_usuarios WHERE id_usuario = ?',
            [id]
        );
        return result.affectedRows;
    }
}

export default new UserRepository();
