import express from 'express';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(usuarioRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso! http://localhost/${PORT}`);
})