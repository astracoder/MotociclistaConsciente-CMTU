import express from 'express';
import { cadastrar, login } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/cadastro', cadastrar);
router.post('/login', login);
// router.put('/editarSenha', editarSenha);
// router.put('/editarNome', editarNome);
// router.put('/editarEmail', editarEmail);
// router.get('/selecionarUsuario', selecionarUsuario);
// router.get('/selecionarUsuarios', selecionarTodosUsuarios);
// router.put('/desativarUsuario', desativarUsuario);
// router.put('/ativarUsuario', ativarUsuario);


export default router;