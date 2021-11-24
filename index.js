const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const pool = require('./creds');

app.use(express.static('public'));
app.use(cors())
app.use(express.json());

var currentViewedTable;

app.post('/bruh',async(req,res)=>{
    try{
        console.log('I got a request');
        const data = req.body
        currentViewedTable = data.currentTable
        console.log(`Select * from ${currentViewedTable};`)
        const newTable = await pool.query(`Select * from ${currentViewedTable};`)
        res.json(newTable.rows)
        console.log(newTable.rows)
        res.end()
}catch(e){
    console.log(e.message)
}
});


app.get('/demos', async(req, res)=>{
  try{
    const allDemos = await pool.query(`SELECT * FROM demo`);
    res.json(allDemos.rows);
    // console.log(allDemos);
  } catch(err){
    console.log(err.message);
  }
});
app.get('/test', async(req, res)=>{
  try{
    const allDemos = await pool.query(`SELECT * FROM test`);
    res.json(allDemos.rows);
    // console.log(allDemos);
  } catch(err){
    console.log(err.message);
  }
});
app.get("/demos/:id", async(req, res)=>{
    try {
        const {tableName} = req.body
        const differentTable = await pool.query(`SELECT * FROM $1`,[tableName]);
        console.log("hello??")
        res.json(differentTable.rows);
    } catch (e) {
        console.log(err.message);
    }
});





app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`server has started on port ${port}`);
});














/*
const http = require('http')
const fs = require('fs')
const port = 4000
const server = http.createServer(function(req,res){
    res.writeHead(200,{ 'Content-Type':'text/html'})
    fs.readFile('index.html',function(error,data){
        if (error) {
            res.writeHead(404)
            res.write('Error: File not found')
        }else{
            res.write(data)
        }
        res.end()
    })
})

server.listen(port, function(error){
    if(error) {
        console.log("Wrong turn", error)
    } else{
        console.log('Server listening '+ port)
    }
})
*/
