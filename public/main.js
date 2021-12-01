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
  table.border = "5";

  var columnCount = abcd.length

  var row = table.insertRow(-1)
  for(let i = 0; i < columnCount;i++){
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = abcd[i]
      row.appendChild(headerCell);
  }

  for(let i = 0; i< displayData.length; i++){
      row = table.insertRow(-1);
      for(let j = 0;j < columnCount;j++){
          var cell = row.insertCell(-1);
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
    // sets name of the table to be queried
    currentTable = document.getElementById('tableSelect').value;
    const data = {currentTable};
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
