//crear server node.js
const { create } = require('node:domain');
const { readFile } = require('node:fs/promises');
const http = require('node:http');
const url = require('node:url')


const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.url === '/') {
        res.statusCode = 200
        res.end('<h1>Hola mundo!</h1>')
    } else {
        res.statusCode = 404
        res.end('404 Internal server error')
    }

}

const newServer = http.createServer(processRequest)


// newServer.listen(3000, () => {
//     console.log('server listening on port http://localhost:3000')
// })

//Ejercicio: Servidor de Fecha y Hora


const processRequest2 = (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (req.url === '/') {
        res.statusCode = 200
        res.end(JSON.stringify({ fecha: new Date() }))
    } else {
        res.statusCode = 404
        res.end('Server 404 not found')
    }
}
const newServer2 = http.createServer(processRequest2);

// newServer2.listen(3000, () => {
//     console.log('Server listening on port http://localhost:3000')
// })


//Ejercicio: Contador de visitas
let contadordeVistas = 0

const processRequest3 = (req, res) => {

    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.url === '/') {
        res.statusCode = 200
        contadordeVistas++
        res.end(`vistas ${contadordeVistas}`)
    } else if (req.url === '/reset') {
        res.statusCode = 200
        contadordeVistas = 0
        res.end(`El contador se reinicio a ${contadordeVistas} `)
    } else {
        res.statusCode = 404
        res.end('Error 404 not found')
    }
}

const newServer3 = http.createServer(processRequest3);

// newServer3.listen(3000, () => {
//     console.log('Server listening on port http://localhost:3000')
// })

///Ejercicio: Servidor de Frases Aleatorias

const frases = [
    { frase: "Nunca es tarde para aprender." },
    { frase: "El éxito es la suma de pequeños esfuerzos repetidos." },
    { frase: "No cuentes los días, haz que los días cuenten." },
]



const processRequest4 = (req, res) => {

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    if (req.url === '/frase') {
        res.statusCode = 200
        const randomFrase = frases[Math.floor(Math.random() * frases.length)]
        res.end(JSON.stringify(randomFrase))
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({error:'404 not found'}))
    }
}

const newServer4 = http.createServer(processRequest4)

// newServer4.listen(3000, () => {
//     console.log('Server listening on port 3000')
// })


//Crea un servidor HTTP con Node.js que lea un archivo 
// mensaje.txt y lo envíe como respuesta al cliente cuando acceda a localhost:3000.

async function processRequest5(req, res){
    res.setHeader('Content-Type', 'text/plain, charset=utf-8');
    if(req.url === '/'){
        const text = await readFile('./texto.txt','utf-8')
        res.statusCode = 200
        res.end(text)
    }else{
        res.statusCode = 404;
        res.end('Error 404 not found')
    }
}

const newServer5 = http.createServer(processRequest5);

newServer5.listen(3000, () =>{
    console.log('Server listening on port 3000')
})