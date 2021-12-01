// set global variable displayData
let displayData = []
//set this to demo in order to show a table upon loaading
var currentTable  = ""

// function to set displayData
const setData = (data) => {
  displayData = data;
}
const generateRows = () => {
  displayData.sort((a, b) => {
    return a.key - b.key;
  });

  const demoTable = document.querySelector('#demo-table');
  let testHTML = "";
  abcd = Object.keys(displayData[0])
  console.log(abcd)
  var nextCell = abcd[0]
  var table  = document.createElement("TABLE");
  //table.border = "5";
  table.style.backgrounColor = "blue"



  var columnCount = abcd.length

  var row = table.insertRow(-1)
  for(let i = 0; i < columnCount;i++){
      var headerCell = document.createElement("TH");
      headerCell.style.outline = "2px solid "
      headerCell.innerHTML = abcd[i]
      row.appendChild(headerCell);
  }

  for(let i = 0; i< displayData.length; i++){
      row = table.insertRow(-1);
      for(let j = 0;j < columnCount;j++){

          var cell = row.insertCell(-1);
          cell.style.outline = "2px solid "
          var nextCell = abcd[j]
          cell.innerHTML = displayData[i][nextCell]
      }
  }

  var dvTable = document.getElementById("dvTable")
  dvTable.innerHTML = "";

  dvTable.appendChild(table)


}
async function all(){

    try {
       // GET all displayData from "http://localhost:5000/displayData"
       const response = await fetch("http://localhost:3000/"+currentTable);
       console.log('http://localhost:3000/'+currentTable)
       // connect to heroku, remove localhost:port
       // const response = await fetch("/displayData")

       const jsonData = await response.json();
       // console.log(jsonData);

       setData(jsonData);
       generateRows();
       // setTimeout(() => {
       //   console.log(displayData);
       // }, 100);

     } catch (err) {
       console.log(err.message);
     }
}
all();
async function employeeSelect(){
    var tableChoice = document.getElementById("relationForEmployee").selectedIndex
    console.log(tableChoice)
    if (tableChoice == 0){
    var employeeID = document.querySelector('#employee-input').value;
    const data = {employeeID}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3000/singleEmployee",options)
    const singleTable = await response.json()
    setData(singleTable);
    generateRows();
}else{
    tableChoice = document.getElementById("relationForEmployee").value;
    var employeeID = document.querySelector('#employee-input').value;
    const data = {tableChoice,employeeID}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3000/EmployeeByRelation",options)
    const singleTable = await response.json()
    setData(singleTable);
    generateRows();
}

}
async function tableSelect(){
    var currentTable = document.getElementById("tableSelect").value;
    // sets name of the table to be queried
    currentTable = document.getElementById('tableSelect').value;
    const data = {currentTable};
    console.log(currentTable);
    // the beginning of server operations
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    // response here gets info back from the server, in this case, the actual query
    // from the other side
    const response = await fetch("http://localhost:3000/select",options);
    // sets h2 block to the name of the table being queried

    // assigns the response into json and sets it equal to the variable that will be put through setData
    const newTable = await response.json()
    setData(newTable);
    // generateRows takes the global displayData and displays the tables dyanmically
    generateRows();
    //document.querySelector("#table-input").innerHTML = "";
    //displayData = newTable);
    //console.log(displayData)
    //all();

}
async function selectDep(){
    var depSelect  = document.getElementById("department").selectedIndex;
    depSelect = depSelect - 1;
    const data = {depSelect};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3000/depSelect",options)

    const tableByDep = await response.json()
    setData(tableByDep);
    generateRows();
}
async function employeeInsert(){
    console.log("here")
    var eid = document.querySelector("#add-eid").value
    var fname = document.querySelector("#add-fname").value
    var lname = document.querySelector("#add-lname").value
    var dob = document.querySelector("#add-dob").value
    var email = document.querySelector("#add-email").value
    var phonenum = document.querySelector("#add-phonenum").value
    var address = document.querySelector("#add-address").value
    var jid = document.querySelector("#add-jid").value

    const data = {eid,fname,lname,dob,email,phonenum,address,jid}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response  = await fetch("http://localhost:3000/employeeInsert",options)
}
async function returnData(){
    const idToEdit = document.querySelector('#edit-eid').value
    const data = {idToEdit}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3000/initEdit",options)
    const infoToEdit = await response.json()
    //console.log(infoToEdit[0].employee_id)
    showEdits(infoToEdit[0])

}
async function sendEdit(){
    const editEmployee_id = document.querySelector("#editID")
    const editFname = document.querySelector("#editFname")
    const editLName = document.querySelector("#editLname")
    const editDOB = document.querySelector("#editDOB")
    const editEmail = document.querySelector("#editEmail")
    const editPhone = document.querySelector("#editPhone")
    const editAddress = document.querySelector("#editAddress")
    const editJobId = document.querySelector("#editJobId")

    const data = {editEmployee_id,editFname,editLname,editDOB,editEmail,editPhone,editAddress,editJobId}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

}

function showEdits(info){
    /*
    console.log(info)
    console.log(info.employee_id)
    console.log(info.job_id)
    console.log(info.fname)
    console.log(info.lname)
    console.log(info.dob)
    console.log(info.email)
    console.log(info.phone)
    console.log(info.address)
    console.log(info.job_id)
    */
    document.getElementById('editID').value = info.employee_id
    document.getElementById('editFname').value = info.fname
    document.getElementById('editLname').value = info.lname
    document.getElementById('editDOB').value = info.dob
    document.getElementById('editEmail').value = info.email
    document.getElementById('editPhone').value = info.phone
    document.getElementById('editAddress').value = info.address
    document.getElementById('editJobId').value = info.job_id

}
