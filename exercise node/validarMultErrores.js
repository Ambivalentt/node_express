const http = require('node:http')
const url = require('node:url')

const processRequest = (req, res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk
    })


    req.on('end', () => {

        if (req.url === '/registro' && req.method === 'POST') {
            let errorMessage = []
            res.statusCode = 200

            try {
                const data = JSON.parse(body)

                if (typeof data.usuario !== 'string' || data.usuario.length < 3) {
                    errorMessage.push('El usuario debe contener almenos 3 caracteres')
                }

                if (typeof data.email !== 'string' || !(data.email || '').includes('@')) {
                    errorMessage.push('El email debe contener @')
                }

                if (typeof data.edad !== 'number' || data.edad < 18) {
                    errorMessage.push('Tiense que ser mayor de edad')

                }

                if (errorMessage.length > 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    return res.end(JSON.stringify({ error: errorMessage }))
                }

                res.statusCode = 201
                res.end(JSON.stringify({ registro: 'registro exitoso' }))

            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'Formulario erroneo' }))
            }
            return;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: '404 not found' }))
    })

}

const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log('server listening on port 3000')
})