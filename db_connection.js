require('dotenv').config();
//
// var database_connection;
//
// switch (process.env.NODE_ENV) {
//   case "production":
//       database_connection = process.env.DATABASE_URL;
//     break;
//   default:
//     database_connection = {
//       database: process.env.DATABASE_NAME,
//     }
//     break;
// }
//
// var configuration = {
//   client: 'postgresql',
//   connection: database_connection
// };
//
// module.exports = require('knex')(configuration);
var environment = process.env.NODE_ENV || 'development';
var config = require('./knexfile.js')[environment];
module.exports = require('knex')(config);
