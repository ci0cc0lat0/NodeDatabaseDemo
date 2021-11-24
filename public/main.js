// set global variable demos
let demos = []
var currentTable  = "demos"
// function to set demos
const setDemos = (data) => {
  demos = data;
}
const displayDemos = () => {
  demos.sort((a, b) => {
    return a.key - b.key;
  });

  const demoTable = document.querySelector('#demo-table');
  // display all demos by modifying the HTML in "demo-table"
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

async function initDisplay(){
    try {

    }catch(e){

    }

}
async function tableSelect(){
    currentTable = document.querySelector('#table-input').value;
    //all()
    //console.log(currentTable)
    const data = {currentTable};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const response = await fetch("http://localhost:3000/bruh",options);
    const newTable = await response.json()
    setDemos(newTable);
    displayDemos();
    //demos = newTable);
    //console.log(demos)
    //all();

}
async function funcTest(){
     document.getElementById("bruh").innerHTML = "YOU CLICKED ME!";
     const getData = async () => {
         await fetch('')
         .then(response => response.json())
         .then(data => console.log(data))
     }
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
