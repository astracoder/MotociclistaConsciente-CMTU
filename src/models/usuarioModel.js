import db from '../database/connectionDatabase.js';
import bCrypt from 'bcrypt';

const procuraEmail = "SELECT e_mail FROM usuario WHERE e_mail = ?";
const insereUsuario = "INSERT INTO usuario (NOME, E_MAIL, SENHA) VALUES (?, ?, ?)";
const procuraUsuario = "SELECT e_mail FROM usuario WHERE e_mail = ? AND status = 1";
const mudarSenha = "UPDATE usuario SET senha = ? WHERE e_mail = ?";
const mudarNome = "UPDATE usuario SET nome = ? WHERE e_mail = ?";
const mudarEmail = "UPDATE usuario SET e_mail = ? WHERE id_usuario = ?";
const selecionarUsuario = "SELECT * FROM usuario WHERE id_usuario = ?";
const selecionarTodosUsuarios = "SELECT id_usuario, e_mail, nome FROM usuario WHERE status = 1";
const desativarUsuario = "UPDATE usuario SET status = ? WHERE e_mail = ?";
const ativarUsuario = "UPDATE usuario SET status = ? WHERE e_mail = ?";

// Função para procurar o email no banco
export const getUserByEmail = (email, callback) => {
    db.query(procuraEmail, [email], callback);
};

// Função para inserir o usuário no banco
export const createUser = (nome, email, senhaHash, callback) => {
    db.query(insereUsuario, [nome, email, senhaHash], callback);
};

// Função para alterar a senha do usuário
export const updatePassword = (email, senhaHash, callback) => {
    db.query(mudarSenha, [senhaHash, email], callback);
};

// Função para alterar o nome do usuário
export const updateName = (email, nome, callback) => {
    db.query(mudarNome, [nome, email], callback);
};

// Função para alterar o email do usuário
export const updateEmail = (id, email, callback) => {
    db.query(mudarEmail, [email, id], callback);
};

// Função para pegar um usuário pelo ID
export const getUserById = (id, callback) => {
    db.query(selecionarUsuario, [id], callback);
};

// Função para selecionar todos os usuários
export const getAllUsers = (callback) => {
    db.query(selecionarTodosUsuarios, callback);
};

// Função para desativar um usuário
export const deactivateUser = (email, callback) => {
    db.query(desativarUsuario, [false, email], callback);
};

// Função para ativar um usuário
export const activateUser = (email, callback) => {
    db.query(ativarUsuario, [true, email], callback);
};
