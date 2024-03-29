const jwt = require('jsonwebtoken'); // instalar com: npm i jsonwebtoken
require('dotenv').config();

const secret = process.env.SECRET || 'secret';

const create = (id, email) => {
  const payload = { id, email }; // dados do usuário
  const jwtConfig = {
    algorithm: 'HS256', // algoritmo que vai ser usado
    expiresIn: '30d', // tempo de expiração
  };
  const token = jwt.sign({ data: payload }, secret, jwtConfig); // sign cria o token
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = { create, verify };

// nesse arquivo foi criado o token