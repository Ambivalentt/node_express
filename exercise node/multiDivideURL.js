//Crea un servidor en Node.js que reciba dos números en la URL 
// y devuelva su multiplicación en formato JSON.


const http = require('node:http');
const url = require('node:url')

const multiply = (a, b) => a * b
const divide = (a, b) => (b !== 0 ? a / b : "Error al dividir con 0")

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const numbers = req.url.split('/')//filter(Boolean); // Elimina strings vacíos de la URL

    const num1 = parseInt(numbers[1], 10)
    const num2 = parseInt(numbers[2], 10)
    const num3 = numbers.length === 4 ? parseInt(numbers[3], 10) : NaN

    if (numbers.length === 3) {

        if (!isNaN(num1) && !isNaN(num2)) {
            res.statusCode = 200
            res.end(JSON.stringify(
                {
                    operacion: "Multiplicacion",
                    numeros: [num1, num2],
                    resultado: multiply(num1, num2)
                }
            ))

            return
        }

    } else if (numbers.length === 4 && numbers[1] === 'dividir' && !isNaN(num2) && !isNaN(num3)) {
        const resultado = divide(num2, num3);
        res.statusCode = resultado === "Error al dividir con 0" ? 400 : 200;

        if(resultado === "Error al dividir con 0"){
            return res.end(JSON.stringify({error:"Error al dividir con 0"}))
        }

        res.end(JSON.stringify({
            operacion: "Division",
            numeros: [num2, num3],
            resultado: resultado
        }))
        return
    }  
        res.statusCode = 404
        res.end(JSON.stringify({ error: "Valores invalidos" }))
    


}

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log('server listening on port 3000')
})
