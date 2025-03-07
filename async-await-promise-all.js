const { error } = require('node:console')
const { readFile, read, writeFile } = require('node:fs/promises')
const pc = require('picocolors')


///
async function init() {
    console.log('leyendo el primer archivo...')

    const text = await readFile('./archivo1.txt', 'utf-8')

    console.log(text)

    const text2 = await readFile('./archivo2.txt', 'utf-8')

    console.log('leyendo el segundo archivo...')
    console.log(text2)

}

///

const rutaPath = './archivo1.txt'

async function escribirArchivo(ruta, contenido) {
    try {
        await writeFile(ruta, contenido, 'utf-8')
        console.log('contenido agregado')
        
        const text = await readFile(ruta, 'utf-8')
        console.log('agregado con exito', 'mensaje',text)
    } catch (err) {
        throw new Error(`Error al contrar la ruta ${err.message} `)
    }
    
}

escribirArchivo(rutaPath, '12313')

///


Promise.all([
    readFile('./archivo1.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')

]).then(([text, text2]) =>{
    console.log('primer texto:',text)
    console.log('segundo texto',text2)
})

