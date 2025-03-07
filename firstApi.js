const http = require('node:http')

const json = require('./pokemon/charizard.json')

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/charizard':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(json))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>Stus 404</h1>')
            }

        case 'POST':
            switch (url) {
                case '/pokemon':
                    let body = ''
                    req.on('data', chunk => {
                        body += chunk.toString()
                    })
                    req.on('end', () => {
                        const data = JSON.parse(body)
                        res.writeHeader(201, { 'Content-Type': 'application/json; charset=utf-8' })
                        data.timestamp = Date.now()
                        res.end(JSON.stringify(data))
                    })
                    break
            }

    }
}

const server = http.createServer(processRequest);

server.listen(1234, () => {
    console.log(`server listening on port http://localhost:1234`)
})