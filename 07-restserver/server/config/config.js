require('dotenv').config();

// ====================
// Puerto
// ====================

process.env.PORT = process.env.PORT || 3000;

// ====================
// Entorno
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
// Vencimiento del Token
// ====================

const seconds = 60;
const minutes = 60;
const hours = 24;
const days = 30;

const expiration = seconds * minutes * hours * days;

process.env.TOKEN_EXPIRATION = expiration;

// ====================
// SEED de autenticación
// ====================

process.env.SEED = process.env.SEED || 'secret-dev';

// ====================
// Base de datos
// ====================

let uri;
const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASS;

if (process.env.NODE_ENV === 'dev') {
  // Falta configurar URI de desarrollo
  uri = `mongodb+srv://${username}:${password}@cluster0.lldbo.mongodb.net/${dbName}?retryWrites=true&w=majority`;
} else {
  uri = `mongodb+srv://${username}:${password}@cluster0.lldbo.mongodb.net/${dbName}?retryWrites=true&w=majority`;
}

process.env.URLDB = uri;
