///saludo?name=Juan → Debe responder con "Hola, Juan!" (El nombre debe ser dinámico).
///suma?a=5&b=3 → Debe responder con la suma de a + b.
//Si la ruta no existe, debe devolver un error 404.

const http = require('node:http');
const url = require('node:url');

const sum = (a, b) => a + b

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const fullUrl = url.parse(req.url, true) //true hace que se convierta en objeto el url, .query trae todos los query o parametro
    const path = fullUrl.pathname;
    const parameters = fullUrl.query

    if (path === '/suma') {
        res.statusCode = 200
        const numA = Number(parameters.a);
        const numB = Number(parameters.b);

        if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
            const result = sum(numA, numB)
            res.end(JSON.stringify({numero1:numA, numero2:numB, respuesta:result}))
        } else {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Poner un numero valido' }))
        }
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ error: 'Error 404 page not found' }))
    }

}

const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log('server listening on 3000')
})