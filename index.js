// Reference the readme in order to unstand what is happening
// Server is ran with node index.js


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
