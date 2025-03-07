const express = require('express')
const charizard = require('./pokemon/charizard.json')

const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 1234

// app.use(express.json()) <== Todo esto equivale a lo de abajo

app.use((req, res, next) => {
    console.log('mi primer middelware')

    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next()

    //solo llegan request que son POST y que tienen el header content type json
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString()
    })

    //se ejecuta cuando ya recibio los datos
    req.on('end', () => {

        const data = JSON.parse(body)
        data.timestamp = Date.now()
        //mutar la request y meter la i nformacion en el req.body
        req.body = data
        next()

    })
})
///////////////////////////////////////////////////////////////////////////

app.get('/pokemon/charizard', (req, res) => {
    res.json(charizard)
})

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)
})


//la ultima a la que llegara errors (.use es para todos, get,post,delete,etc)
app.use((req, res) => {
    res.status(404).send(`<b>Error 404<b/>`)
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})