import { Router } from "express";
import { salvarUsuario, listarUsuarios, buscarUsuarioPorId, salvarLogin, realizarLogin, editarConta, alterarSenhaUsuario } from "../repository/UserRepository.js";

const router = Router();
router.post('/usuario', async (req, resp) => {
  try {
    const { login, ...dadosUsuario } = req.body;

    // Salvar login e obter o objeto atualizado com o ID
    const novoLogin = await salvarLogin(login);

    // Salvar usuário usando o ID do login
    const usuario = { ...dadosUsuario, idLogin: novoLogin.id };
    const novoUsuario = await salvarUsuario(usuario);

    resp.status(201).send({ usuario: novoUsuario, login: novoLogin });
  } catch (error) {
    console.error("Erro ao salvar usuário e login:", error);
    resp.status(500).send({ message: "Erro ao salvar usuário. Tente novamente mais tarde." });
  }
});

router.post('/login', async (req, resp) => {
  try {
    const { usuario, senha } = req.body;

    const login = await realizarLogin(usuario, senha);

    if (!login) {
      return resp.status(401).send({ message: "Usuário ou senha inválidos." });
    }

    resp.status(200).send(login); // Retorna as informações do login
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    resp.status(500).send({ message: "Erro ao realizar login. Tente novamente mais tarde." });
  }
});

router.get('/usuario', async (req, resp) => {
  try {
    const usuarios = await listarUsuarios();
    resp.status(200).send(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    resp.status(500).send({ message: "Erro ao listar usuários. Tente novamente mais tarde." });
  }
});

router.get('/usuario/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const usuario = await buscarUsuarioPorId(id);

    if (usuario) {
      resp.status(200).send(usuario);
    } else {
      resp.status(404).send({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    resp.status(500).send({ message: "Erro ao buscar usuário. Tente novamente mais tarde." });
  }
});

router.put('/usuario/:id', async (req, resp) => {
  try {
    const idUsuario = req.params.id;
    const dados = req.body;

    const sucesso = await editarConta(idUsuario, dados);

    if (!sucesso) {
      return resp.status(404).send({ message: "Usuário não encontrado ou dados não atualizados." });
    }

    resp.status(200).send({ message: "Informações atualizadas com sucesso." });
  } catch (error) {
    console.error("Erro ao editar conta:", error);
    resp.status(500).send({ message: "Erro ao editar informações da conta. Tente novamente mais tarde." });
  }
});

export const alterarSenha = async (req, res) => {
  try {
    const { idUsuario, senhaAntiga, novaSenha } = req.body;

    if (!idUsuario || !senhaAntiga || !novaSenha) {
      return res.status(400).send({ error: 'Todos os campos são obrigatórios.' });
    }

    const senhaAlterada = await alterarSenhaUsuario(idUsuario, senhaAntiga, novaSenha);

    if (!senhaAlterada) {
      return res.status(400).send({ error: 'Senha antiga inválida ou usuário não encontrado.' });
    }

    res.status(200).send({ message: 'Senha alterada com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Erro interno ao alterar a senha.' });
  }
};

export default router;
