//Crea un servidor que tenga una ruta 
//convertir para convertir grados Celsius a Fahrenheit o viceversa.
//Agregar una ruta /hora que devuelva la hora actual en formato JSON.
const http = require('node:http');
const url = require('node:url');

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9)
}

const processRequest = (req, res) => {

    res.setHeader('Content-Type', 'application/json; charset=utf-8')

    const allUrl = url.parse(req.url, true) //true convierte en json
    const urlPath = allUrl.pathname; //pathnames
    const querys = allUrl.query //buscamos querys 

    if (urlPath === '/hora') {
        res.statusCode = 200
        return res.end(JSON.stringify({ hora: new Date().toLocaleTimeString() }))  //retorn la hora
    }

    if (urlPath === '/convertir') {             //si esta en convertir
        res.statusCode = 200
        const degree = Number(querys.grados);   //primer parametro convertido a numero
        const type = querys.tipo?.toUpperCase();   //segundo query string ? por si es vacio y no rompa el codigo

        if (Number.isNaN(degree)) {       //si grado es NaN no es un numero y tirara error
            res.statusCode = 400
            return res.end(JSON.stringify({ error: 'Colorar un grado correcto' }))
        }

        if (type === "C") {                 //si el query type C
            return res.end(JSON.stringify({
                operacion: "Celsius a Fahrenheit",
                grado: degree,
                resultado: toFahrenheit(degree)
            }))
        }

        if (type === "F") {              //si el query es F
            return res.end(JSON.stringify({
                operacion: "Fahrenheit a Celsius",
                grado: degree,
                resultado: toCelsius(degree)
            }))
        }
        if (type !== "C" && type !== "F") {         //Si el query no es C y F
            res.statusCode = 400
            return res.end(JSON.stringify({
                error: "Colocar bien el tipo C o F"
            }))
        }

    }

    res.statusCode = 404      //error si no se cumple las 2 rutas asignadas
    res.end(JSON.stringify({ error: 'Error 404 pagina no encontrada' }))


}


const server = http.createServer(processRequest)

server.listen(3000, () => {
    console.log('server listen on port 3000')
})