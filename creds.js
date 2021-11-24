const { Pool } = require('pg');
const pool = new Pool({
  host: "fanny.db.elephantsql.com",
  user: "ijonvfva",
  password: "qATO_knbfN5fF4IwBMoMV9rYpOFlOTai",
  database: "ijonvfva",
  port: "",
});

module.exports = pool;
