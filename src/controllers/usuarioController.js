const bCrypt = require("bcrypt");
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "1020";


//http://localhost:8079/usuario/cadastro
const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;
    const procuraEmail = "SELECT e_mail FROM usuario WHERE e_mail = ? ";
    const insereUsuario = "INSERT INTO usuario (NOME,E_MAIL, SENHA) VALUES(?,?, ?)";

    if (!email || !senha || !nome) {

        return res.status(400).json({ mensagem: "Email, senha e nome são obrigatórios" });
    }
    if (!regexEmail.test(email)) {
        return res.status(400).json({ mensagem: "Email invalido !" });
    }
    if (!regexSenha.test(senha)) {
        return res.status(400).json({ mensagem: "Senha deve ter 8 caracteres!" });
    }
    const senhaHash = bCrypt.hashSync(senha, 10);

    db.query(procuraEmail, [email], (err, result) => {

        if (err) return res.status(400).json({ mensagem: "Erro ao procurar email." });

        if (result.length > 0) {
            return res.status(400).json({ mensagem: "Email já existe na base de dados." });
        }

        db.query(insereUsuario, [nome, email, senhaHash], (err) => {
            if (err) return res.status(400).send("Não foi possível inserir o usuário.");
            res.status(200).json({ mensagem: "Usuário cadastrado com sucesso." });
        });
    });
};

//http://localhost:8079/usuario/login
const login = (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {

        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }
    const sql = "SELECT e_mail, senha FROM usuario WHERE e_mail = ? AND status = 1";

    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao consultar o banco de dados." });

        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Email incorreto! ou usuário se encontra desativado" });
        }

        const senhaCripto = results[0].senha;
        console.log(senhaCripto);
        const senhaCorreta = await bCrypt.compare(senha, senhaCripto);
        if (senhaCorreta) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login realizado com sucesso", token });
        } else {
            return res.status(400).json({ mensagem: "Senha incorreta!" });
        }
    });
};

//http://localhost:8079/usuario/editarSenha
const editarSenha = (req, res) => {
    const { email, senha } = req.body;
    const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;
    if (!email || !senha) {

        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }
    const procuraUsuario = "SELECT e_mail FROM usuario WHERE e_mail = ? AND status = 1";
    const mudarSenha = "UPDATE usuario SET senha = ? WHERE e_mail = ?";
    if (!regexSenha.test(senha)) {
        return res.status(400).json({ mensagem: "Senha deve ter 8 caracteres" })
    }
    db.query(procuraUsuario, [email], async (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email incorreto ou usuário se encontra desativado!" });

        const senhaCripto = bCrypt.hashSync(senha, 10);
        db.query(mudarSenha, [senhaCripto, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível mudar a senha." });
            res.status(200).json({ mensagem: "Senha alterada com sucesso!" });
        });
    });
};

//http://localhost:8079/usuario/editarNome
const editarNome = (req, res) => {
    const { email, nome } = req.body;
    if (!email || !nome) {

        return res.status(400).json({ mensagem: "Email e nome são obrigatórios" });
    }
    const procuraUsuario = "SELECT e_mail, status FROM usuario WHERE e_mail = ? AND status = 1";
    const mudarNome = "UPDATE usuario SET nome = ? WHERE e_mail = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email incorreto ou usuário se encontra desativado!" });

        db.query(mudarNome, [nome, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível mudar o nome." });
            res.status(200).json({ mensagem: "Nome alterado com sucesso!" });
        });
    });
};

//http://localhost:8079/usuario/editarEmail
const editarEmail = (req, res) => {
    const { id, email } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !id) {
        return res.status(400).json({ mensagem: "Email e id são obrigatórios" });
    }
    const procuraEmail = "SELECT e_mail,status FROM usuario WHERE id_usuario = ? AND status = 1";
    const mudarEmail = "UPDATE usuario SET e_mail = ? WHERE id_usuario = ?";
    if (!regexEmail.test(email)) {
        return res.status(400).json("Email invalido !");
    }
    db.query(procuraEmail, [id], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Id incorreto ou usuário se encontra desativado!" });

        db.query(mudarEmail, [email, id], (err, results) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível mudar o email." });
            res.status(200).json({ mensagem: "Email alterado com sucesso!" });
        });
    });
};


//localhost:8079/usuario/selecionarUsuario
const selecionarUsuario = (req, res) => {
    const { id } = req.body;
    if (!id) {

        return res.status(400).json({ mensagem: "ID obrigatório" });
    }
    const procuraUsuario = "SELECT * FROM usuario WHERE id_usuario = ?";
    db.query(procuraUsuario, id, (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao procurar usuario" });

        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Usuário não encontrado !" });
        } else {
            const usuario = {
                "email": results[0].E_MAIL,
                "nome": results[0].NOME
            }
            res.status(200).json(usuario);
        }

    });
}
//seleciona todos os usuários que estejam ativos;
//localhost:8079/usuario/selecionarUsuarios
const selecionarTodosUsuarios = (req, res) => {
    const selecionarTodos = "SELECT id_usuario,e_mail, nome FROM usuario WHERE status=1"
    db.query(selecionarTodos, (err, results) => {
        if (results.length === 0) return res.status(400).json({ mensagem: "Nenhum usuário foi cadastrado ainda !" })
        let usuarios = results;
        res.status(200).json(usuarios);
    });
}
//http://localhost:8079/usuario/desativarUsuario
const desativarUsuario = (req, res) => {
    const { email } = req.body;
    if (!email) {

        return res.status(400).json({ mensagem: "Email é obrigatório" });
    }
    const procuraUsuario = "SELECT e_mail, status FROM usuario WHERE e_mail = ?";
    const desativarUsuario = "UPDATE usuario SET status = ? WHERE e_mail = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email não encontrado!" });
        if (!results[0].status) return res.status(400).json({ mensagem: "O usuario já esta desativado" })
        db.query(desativarUsuario, [false, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível desativar usuário." });
            res.status(200).json({ mensagem: "Usuário desativado!" });
        });
    });
};

//localhost:8079/usuario/ativarUsuario
const ativarUsuario = (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ mensagem: "Email é obrigatório" });
    }
    const procuraUsuario = "SELECT e_mail, status FROM usuario WHERE e_mail = ?";
    const ativarUsuario = "UPDATE usuario SET status = ? WHERE e_mail = ?";

    db.query(procuraUsuario, [email], (err, results) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) return res.status(400).json({ mensagem: "Email não encontrado!" });
        if (results[0].status) return res.status(400).json({ mensagem: "O usuário já esta ativado" })
        db.query(ativarUsuario, [true, email], (err) => {
            if (err) return res.status(400).json({ mensagem: "Não foi possível ativar usuário." });
            res.status(200).json({ mensagem: "Usuário ativado!" });
        });
    });
};

module.exports = { cadastrar, login, editarSenha, editarNome, selecionarUsuario, selecionarTodosUsuarios, editarEmail, desativarUsuario, ativarUsuario };