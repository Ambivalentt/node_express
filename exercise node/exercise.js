const http = require('node:http');
const url = require('node:url');

let bd = []

const processRequest = (req, res) => {

    let data = ''


    const verifyNumber = (num) => typeof num !== 'number' || Number.isNaN(num);
    const verifyString = (str) => typeof str !== "string" || str.trim() === "";


    req.on('data', chunk => {
        data += chunk
    })



    req.on('end', () => {
        if (req.url === '/datos' && req.method === 'POST') {

            try {

                const datajson = JSON.parse(data)

                if (verifyString(datajson.nombre) || verifyNumber(datajson.edad)) {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify({ error: 'Rellenar bien los datos' }))
                }

                res.writeHead(201, { 'Content-Type': 'application/json' });
                bd.push(datajson)
                return res.end(JSON.stringify({ datos: 'datos cargados' }))
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'error al cargar el formulario' }))
            }

        } else if (req.url === '/datos' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(bd));
        }



        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'error 404 not found' }))
    })

}

const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log('server listening on port 3000')
})