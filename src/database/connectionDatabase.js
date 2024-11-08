const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',  // Host do banco de dados
    user: 'root',  // Usuário do banco de dados
    password: '1234',  // Senha do banco de dados
    database: 'cmtu',  // Nome do banco de dados

});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão ao MySQL bem-sucedida!');
});

module.exports = db;