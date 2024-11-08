// const jwt = require('jsonwebtoken');
// const SECRET_KEY = "1020";

// const verificarToken = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).send("Acesso negado!");
//     }

//     const tokenValido = token.includes('Bearer ') ? token.split(' ')[1] : token;

//     jwt.verify(tokenValido, SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.status(403).send("Token inválido!");
//         }
//         req.user = user;
//         next();
//     });
// };

// module.exports = verificarToken;