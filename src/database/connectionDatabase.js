import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost', 
    user: 'postgres', 
    password: '36313582', 
    database: 'cmtu', 
    port: 5432, 
});

pool.connect((err, client, release) => {
    if(err) {
        console.log('Erro ao conectar ao banco CMTU!');
        return;
    }
    console.log('Conectado ao banco CMTU!')
})