const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const pool = require('./creds');

app.use(express.static('public'));
app.use(cors())
app.use(express.json());
// the current table being viewed for query. Empty
var currentViewedTable;

// The address we designate. will be accessed and communicated to by the main.js
app.post('/select',async(req,res)=>{
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
app.post('/singleEmployee', async(req,res)=>{
    try{
        const data = req.body
        const employeeID = data.employeeID
        console.log(`SELECT * from employee where employee_id = ${employeeID}`)
        const employeeQuery = await pool.query(`SELECT * from employee where employee_id = ${employeeID};`)
        res.json(employeeQuery.rows)
        res.end()
    }catch(e){
        console.log(e.message)
    }
})
app.post('/dep', async(req,res)=>{
    try{
        const data = req.body
        const employeeByDep = data.depSelect
        if (employeeByDep >=0 ){
            console.log(`select * from employee join job ON employee.job_id = job.job_id where dep_id = ${employeeByDep};`)
            const depQuery = await pool.query(`select * from employee join job ON employee.job_id = job.job_id where dep_id = ${employeeByDep};`)
            res.json(depQuery.rows)
            res.end()
        }
        else{
            const altQuery =await pool.query(`Select * from employee`);
            res.json(altQuery.rows)
            res.end()
        }
    }catch(e){
        console.log("Error Message:")
        console.log(e.message)
    }
})
app.post('/employeeByRelation', async(req,res)=>{

    //const data;
    //const relationChoice = data;
    //const specificRelationQuery = await pool.query(`select employee.*, ${relationChoice}.* from employee join job ON employee.job_id = job.job_id join benefit ON job.benefit_code = benefit.benefit_code join salary ON job.salary_id = salary.salary_id join department ON job.dep_id = department.dep_id join payment ON employee.employee_id = payment.employee_id;`)
    //res.json(specificRelationQuery.rows)
    //res.end()
});
// Nothing to worry about
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

//Tells where the index.html is
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
//Gives the port to listen to
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

