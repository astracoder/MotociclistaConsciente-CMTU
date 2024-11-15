const bCrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
const SECRET_KEY = "1020";

// Cadastro de usuário
const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexSenha = /[A-Za-z\d!@#$%^&*]{8,}/;

    if (!email || !senha || !nome) {
        return res.status(400).json({ mensagem: "Email, senha e nome são obrigatórios" });
    }
    if (!regexEmail.test(email)) {
        return res.status(400).json({ mensagem: "Email inválido!" });
    }
    if (!regexSenha.test(senha)) {
        return res.status(400).json({ mensagem: "Senha deve ter 8 caracteres!" });
    }

    const senhaHash = bCrypt.hashSync(senha, 10);

    usuarioModel.getUserByEmail(email, (err, result) => {
        if (err) return res.status(400).json({ mensagem: "Erro ao procurar email." });
        if (result.length > 0) {
            return res.status(400).json({ mensagem: "Email já existe na base de dados." });
        }

        usuarioModel.createUser(nome, email, senhaHash, (err) => {
            if (err) return res.status(400).send("Não foi possível inserir o usuário.");
            res.status(200).json({ mensagem: "Usuário cadastrado com sucesso." });
        });
    });
};

// Login de usuário
const login = (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }

    usuarioModel.getUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao consultar o banco de dados." });
        if (results.length === 0) {
            return res.status(400).json({ mensagem: "Email incorreto ou usuário se encontra desativado" });
        }

        const senhaCripto = results[0].senha;
        const senhaCorreta = await bCrypt.compare(senha, senhaCripto);
        if (senhaCorreta) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login realizado com sucesso", token });
        } else {
            return res.status(400).json({ mensagem: "Senha incorreta!" });
        }
    });
};

// Outros métodos seguem a mesma estrutura, chamando as funções do model para interação com o banco de dados.

module.exports = {
    cadastrar,
    login,
    // outros métodos
};
