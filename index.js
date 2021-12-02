// This is the the main
const fs = require('fs')
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
        fs.appendFileSync('server.sql',`Select * from ${currentViewedTable}; \n`)
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
        fs.appendFileSync('server.sql',`SELECT * from employee where employee_id = ${employeeID};\n`)
        res.json(employeeQuery.rows)
        res.end()
    }catch(e){
        console.log(e.message)
    }
})
app.post('/depSelect', async(req,res)=>{
    try{
        const data = req.body
        const employeeByDep = data.depSelect
        if (employeeByDep >=0 ){
            console.log(`select * from employee join job ON employee.job_id = job.job_id where dep_id = ${employeeByDep};`)
            const depQuery = await pool.query(`select * from employee join job ON employee.job_id = job.job_id where dep_id = ${employeeByDep};`)
            fs.appendFileSync('server.sql',`select * from employee join job ON employee.job_id = job.job_id where dep_id = ${employeeByDep}; \n`)
            res.json(depQuery.rows)
            res.end()
        }
        else{
            const altQuery =await pool.query(`Select * from employee`);
            fs.appendFileSync('server.sql',`Select * from employee \n`);

            res.json(altQuery.rows)
            res.end()
        }
    }catch(e){
        console.log("Error Message:")
        console.log(e.message)
    }
})
app.post('/EmployeeByRelation', async(req,res)=>{


    const data = req.body;
    const employeeChoice = data.employeeID
    const relationChoice = data.tableChoice;
    //console.log(`select employee.*, ${relationChoice}.* from employee join job ON employee.job_id = job.job_id join benefit ON job.benefit_code = benefit.benefit_code join salary ON job.salary_id = salary.salary_id join department ON job.dep_id = department.dep_id join payment ON employee.employee_id = payment.employee_id where employee.employee_id = ${employeeChoice};`)
    const specificRelationQuery = await pool.query(`select employee.*, ${relationChoice}.* from employee join job ON employee.job_id = job.job_id join benefit ON job.benefit_code = benefit.benefit_code join salary ON job.salary_id = salary.salary_id join department ON job.dep_id = department.dep_id join payment ON employee.employee_id = payment.employee_id where employee.employee_id = ${employeeChoice};`)
    fs.appendFileSync('server.sql',`select employee.*, ${relationChoice}.* from employee join job ON employee.job_id = job.job_id join benefit ON job.benefit_code = benefit.benefit_code join salary ON job.salary_id = salary.salary_id join department ON job.dep_id = department.dep_id join payment ON employee.employee_id = payment.employee_id where employee.employee_id = ${employeeChoice}; \n`);

    res.json(specificRelationQuery.rows)
    res.end()
});
app.post('/employeeInsert', async(req, res)=>{

    try{
    const data = req.body;

    const employee_id = data.eid
    const fname = data.fname
    const lname = data.lname
    const dob = data.dob
    const email = data.email
    const phonenum = data.phonenum
    const address = data.address
    const job_id = data.jid
    //console.log(`select salary_id from job where job_id = ${job_id};`)
    //console.log(`INSERT INTO employee VALUES (${employee_id}, '${fname}','${lname}','${dob}','${email}','${phonenum}','${address}',${job_id});`)
    const salaryData  = await pool.query(`select salary_id from job where job_id = ${job_id};`)
    fs.appendFileSync('server.sql',`select benefit_code from job where job_id = ${job_id}; \n`);

    const benefitData  = await pool.query(`select benefit_code from job where job_id = ${job_id};`)
    fs.appendFileSync('server.sql',`select benefit_code from job where job_id = ${job_id}; \n`);

    const newS_id = salaryData.rows[0].salary_id
    const newB_code = benefitData.rows[0].benefit_code


    const start = await pool.query(`BEGIN TRANSACTION;`)
    fs.appendFileSync('server.sql',`BEGIN TRANSACTION; \n`);

    const addEmployee = await pool.query(`INSERT INTO employee VALUES (${employee_id}, '${fname}','${lname}','${dob}','${email}','${phonenum}','${address}',${job_id});`)
    fs.appendFileSync('server.sql',`INSERT INTO employee VALUES (${employee_id}, '${fname}','${lname}','${dob}','${email}','${phonenum}','${address}',${job_id}); \n`);

    const addPayment = await pool.query(`INSERT INTO payment VALUES (${employee_id},${newS_id},0,0,0,0.153,${newB_code},0);`)
    fs.appendFileSync('server.sql',`INSERT INTO payment VALUES (${employee_id},${newS_id},0,0,0,0.153,${newB_code},0); \n`);

    const end = await pool.query(`COMMIT TRANSACTION;`)
    fs.appendFileSync('server.sql',`COMMIT TRANSACTION; \n`);


    console.log("New hire added. Payment and employee tables affected")
}catch(e){
    console.log(e.message)
    res.end();
}

    res.end();
});
var edForLater;
app.post('/initEdit', async(req,res)=>{
    const data = req.body
    const eid = data.idToEdit
    edForLater = data.idToEdit
    const editQuery = await pool.query(`SELECT * from employee where employee_id = ${eid}`)
    fs.appendFileSync('server.sql',`SELECT * from employee where employee_id = ${eid}; \n`);

    res.json(editQuery.rows)
    res.end()
});
app.post('/finalEdit', async(req,res)=>{
    const data = req.body
    const feEmployee_id = data.editEmployee_id
    const feFname= data.editFname
    const feLname= data.editLname
    const feDOB= data.editDOB
    const feEmail= data.editEmail
    const fePhone= data.editPhone
    const feAddress= data.editAddress
    const feJobId= data.editJobId
    try{


    console.log(`UPDATE employee SET employee_id = ${feEmployee_id},fname='${feFname}',lname='${feLname}'dob='${feDOB}',email='${feEmail}',phone= '${fePhone}',address='${feAddress}',job_id=${feJobId} WHERE employee_id = ${edForLater};  `)
    const start = await pool.query(`BEGIN TRANSACTION;`)
    const update= await pool.query(`UPDATE employee SET employee_id = ${feEmployee_id},fname='${feFname}',lname='${feLname}',dob='${feDOB}',email='${feEmail}',phone= '${fePhone}',address='${feAddress}',job_id=${feJobId} WHERE employee_id = ${edForLater} `)
    const end = await pool.query(`COMMIT TRANSACTION;`)
}catch(e){
    console.log(e.message)
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
