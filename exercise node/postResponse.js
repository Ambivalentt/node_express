// Crea un servidor en Node.js sin express que escuche en el puerto 3000 
// y acepte solicitudes POST en la ruta /usuario.

const { write } = require('node:fs');
const http = require('node:http');
const url = require('node:url');

const processRequest = (req, res) => {

    if (req.url === '/producto' && req.method === 'POST') {  //si url es producto y el metodo es POST
        let body = ''           //VARIABLE donde se almacenara los datos

        req.on('data', chunk => {    //se ejecuta cuando recibe datos
            body += chunk.toString()  //evento donde se actualiza la variable de losd atos con los datos
        })

        req.on('end', () => {     //se ejecuta cuando ya no hay mas datos

            try {
                const product = JSON.parse(body)   //parseamos el body a objeto usable

                if (typeof product.name !== "string" || typeof product.price !== "number" || product.price <= 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify({ error: 'Datos inválidos. Se requiere nombre (string) y precio (number > 0)' }))
                }

                res.writeHead(201, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ message: 'Producto guardado', produto: product }))
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: "formato invalido" }))
            }

        })
        return;
    }

    res.statusCode = 404
    res.end(JSON.stringify({ error: 'Error 404 page not found' }))
}




const server = http.createServer(processRequest);
server.listen(3000, () => {
    console.log('Server listening on port 3000')
})