const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cinemax",
  password: "dandiabil",
  port: 5432,
});

module.exports = pool;
