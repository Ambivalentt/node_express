const http = require('node:http');
const net = require('node:net');
const fs = require('node:fs')

// global var 
const desirePort = process.env.PORT ?? 1234

//metodo1
function findAvailablePort(desiredPort) {

    return new Promise((resolve, reject) => {
        const server = net.createServer()

        server.listen(desiredPort, () => {
            const { port } = server.address()
            server.close(() => {
                resolve(port)
            })
        })
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(0).then(port => resolve(port))
            } else {
                reject(err)
            }
        })
    })
}


//metodo 2 automaticamente abre un servirod disponible

// newServer.listen(0,()=>{
//     console.log(`server listening on port http://localhost:${server.address().port}`)
// })
const processRequest = (request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (request.url === '/') {
        response.statusCode = 200 //ok
        response.end('<h1>Bienvenido a mi página web</h1>')
    } else if (request.url === '/imagen') {
        fs.readFile('./713732838415138926.webp', (err, data) => {
            if (err) {
                response.statusCode = 500
                response.end('<b>500 internal server error</b>')
            } else {
                response.setHeader('Content-Type', 'image/webp')
                response.end(data)
            }
        })

    } else {
        response.statusCode = 404 //not found
        response.end('<h1>404</h1>')
    }
}

const newServer = http.createServer(processRequest)


findAvailablePort(desirePort).then(port => {
    newServer.listen(port, () => {
        console.log(`server listening on port http://localhost:${port}`)
    })
})