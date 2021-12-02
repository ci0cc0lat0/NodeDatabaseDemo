const { Pool } = require('pg');
const pool = new Pool({
  host: "3380db.cs.uh.edu",
  user: "dbs018",
  password: "dbs018",
  port: 5432,
  database: "COSC3380",
});

module.exports = pool;
