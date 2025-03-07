const express = require('express');
const app = express()

app.use(express.json())




app.post('/texto', (req, res) => {
    const letters = req.body.letters

    if (!letters.trim() || /[^a-zA-Z\s]/.test(letters) || typeof letters !== "string") {
        return res.status(400).json({ error: 'Ingresar solo letras' })
    }
    const newLetters = letters.toLowerCase().replace(/[^a-z]/g, '')//elimina espacios y simbolos y solo deja letras
    const consonants = newLetters.replace(/[aeiou]/g, "").length //elimina vocales
    const vocals = newLetters.replace(/[^aeiou]/g, "").length //elimina todo menos la que incluya vocales

    res.status(201).json({vocales:vocals, consonantes:consonants})

})

app.use((req, res) => {
    res.status(404).json({ error: "Pagina no encontrada" })
})

app.listen(3000, () => {
    console.log('server listening on port 3000')
})