const { Client} = require('pg')
const creds = require('./creds.json')
const client = new Client({
  host: creds.host,
  user: creds.user,
  password: creds.password,
  database: creds.database
});

async function test(){
    client.connect()
    q = await client.query(`SELECT * FROM test;`)
    console.log(q.rows)
    client.end()
}
test()
