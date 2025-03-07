const express = require('express');
const app = express()
const crypto = require('crypto');

app.use(express.json())

let bd = []


app.post('/tasks', (req, res) => {
    const { task } = req.body
    console.log(bd)

    if (typeof task !== 'string' || task.trim() === "") {
       return res.status(400).json({ error: "necesita poner una tarea" })
    }

    const newTask = {
        id: crypto.randomUUID(),
        task: task
    }

    bd.push(newTask)
    res.status(200).json(newTask)
})

app.get('/tasks', (req, res) => {
    res.status(200).json(bd)
})

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params

    const findId = bd.findIndex(data => data.id === id)

    if(findId === -1){
        return res.status(404).json({error:'error al eliminar'})
    }

    bd.splice(findId, 1)
    res.status(200).json({ message: "Eliminado correctamente" });
})



//not found
app.use((req, res) => {
    res.status(404).json({ error: 'page not found' })
})

//server
app.listen(3000, () => {
    console.log('server listening on server 3000')
})