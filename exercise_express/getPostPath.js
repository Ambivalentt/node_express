const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ greetings: "hola" })
})

//
app.post('/message', (req, res) => {
    console.log(req.body)
    
    const { message } = req.body

    if ( typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ error: "Necesita enviar algo" })
    }

    res.status(201).json({message:message})
})

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" })
})

app.listen(3000, () => {
    console.log('server listening on port 3000')
})