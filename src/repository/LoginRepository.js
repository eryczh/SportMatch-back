import con from './con';

class LoginRepository {
    async findByUsername(username) {
        const [rows] = await con.execute(
            'SELECT * FROM tb_login WHERE usuario = ?',
            [username]
        );
        return rows[0];
    }

    async validateUser(username, password) {
        const [rows] = await con.execute(
            'SELECT * FROM tb_login WHERE usuario = ? AND senha = ?',
            [username, password]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    async createUser(username, password, tipoUsuario) {
        const [result] = await con.execute(
            'INSERT INTO tb_login (usuario, senha, tipo_usuario) VALUES (?, ?, ?)',
            [username, password, tipoUsuario]
        );
        return result.insertId;
    }
}

export default new LoginRepository();
