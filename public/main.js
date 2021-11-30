// set global variable demos
let demos = []
//set this to demo in order to show a table upon loaading
var currentTable  = ""

// function to set demos
const setDemos = (data) => {
  demos = data;
}
const displayDemos = () => {
  demos.sort((a, b) => {
    return a.key - b.key;
  });

  const demoTable = document.querySelector('#demo-table');
  let testHTML = "";
  //console.log(Object.keys(demos[0]))
  abcd = Object.keys(demos[0])
  console.log(abcd)
  var nextCell = abcd[0]
  //console.log(nextCell)
  //console.log(demos[0][nextCell])
  var table  = document.createElement("TABLE");
  table.border = "5";

  var columnCount = abcd.length

  var row = table.insertRow(-1)
  for(let i = 0; i < columnCount;i++){
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = abcd[i]
      row.appendChild(headerCell);
  }

  for(let i = 0; i< demos.length; i++){
      row = table.insertRow(-1);
      for(let j = 0;j < columnCount;j++){
          var cell = row.insertCell(-1);
          var nextCell = abcd[j]
          cell.innerHTML = demos[i][nextCell]
      }
  }

  var dvTable = document.getElementById("dvTable")
  dvTable.innerHTML = "";

  dvTable.appendChild(table)

  // display all demos by modifying the HTML in "demo-table"
  /*
  let tableHTML = "";
  demos.map(demo =>{

    tableHTML +=
    `<tr key=${demo.key}>
    <th>${demo.key}</th>
    <th>${demo.description}</th>
    <th><button class="btn btn-warning" type="button" data-toggle="modal" data-target="#edit-modal" onclick="editDemo(${demo.key})">Edit</button></th>
    <th><button class="btn btn-danger" type="button" onclick="deleteDemo(${demo.key})">Delete</button></th>
    </tr>`;
  })


  demoTable.innerHTML = tableHTML;
  */
}
async function all(){

    try {
       // GET all demos from "http://localhost:5000/demos"
       const response = await fetch("http://localhost:3000/"+currentTable);
       console.log('http://localhost:3000/'+currentTable)
       // connect to heroku, remove localhost:port
       // const response = await fetch("/demos")

       const jsonData = await response.json();
       // console.log(jsonData);

       setDemos(jsonData);
       displayDemos();
       // setTimeout(() => {
       //   console.log(demos);
       // }, 100);

     } catch (err) {
       console.log(err.message);
     }
}
all();
async function employeeSelect(){
    var employeeID = document.querySelector('#employee-input').value;
    const data = {employeeID}
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3000/singleEmployee",options)
    const singleTable = await response.json()
    setDemos(singleTable);
    displayDemos();
}
async function tableSelect(){
    var currentTable = document.getElementById("tableSelect").value;
    // sets name of the table to be queried
    //currentTable = document.querySelector('#table-input').value;
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
    document.getElementById("currentTableName").innerHTML = currentTable
    // assigns the response into json and sets it equal to the variable that will be put through setDemos
    const newTable = await response.json()
    setDemos(newTable);
    // DisplayDemos takes the global demos and displays the tables dyanmically
    displayDemos();
    //document.querySelector("#table-input").innerHTML = "";
    //demos = newTable);
    //console.log(demos)
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
    const response = await fetch("http://localhost:3000/dep",options)
    const tableByDep = await response.json()
    setDemos(tableByDep);
    displayDemos();
}
async function funcTest(){
     document.getElementById("bruh").innerHTML = "YOU CLICKED ME!";
     const getData = async () => {
         await fetch('')
         .then(response => response.json())
         .then(data => console.log(data))
     }
}

async function addNewEmployee(){
    
}

// My functions

/*
async function tableSelect(){
    const inputTable = document.querySelector('#table-input');
    const table = inputTable.value;
    try {
    const body = {table: table}
    const response = await fetch("http://localhost:3000" , {
        method: "post",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const newTable = await response.json();
    demos.push(newTable)
    displayDemos();
    inputTable.values = '';
} catch (err) {
    console.log(err.message);
}
*/
