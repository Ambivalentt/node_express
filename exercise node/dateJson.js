//Crea un servidor HTTP en Node.js que devuelva un JSON con la 
// fecha y hora actual cuando el usuario acceda a localhost:3000/hora.

const http = require('node:http');
const url = require('node:url');

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (req.url === '/hora') {
        res.statusCode = 200
        res.end(JSON.stringify({ hora: new Date().toISOString() }))
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ error: "Error 404 server not found" }))
    }
}

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log('server listening on 3000')
})
