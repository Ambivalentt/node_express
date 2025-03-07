//Crea un servidor HTTP en Node.js que reciba un número por la 
// URL y devuelva si es par o impar en formato JSON.

const http = require('node:http');
const url = require('node:url');

function isPar(number) {                               //funcion para ver si es par o no
    return number % 2 === 0 ? 'Es par' : 'No es par';
}

const processRequest = (req, res) => {                     //funcion de request

    res.setHeader('Content-Type', 'application/json; charset=utf-8');  //header app json
    
    const parts = req.url.split('/');         //nos da el URL y lo de divide en un array

    if (parts.length === 2) {         //Si el URL tiene 2 palabras ("/ indice" y "numero")
                                        //esta correcto 
        const num = parseInt(parts[1], 10);  //convertimos en numero entero
                                            //y vamos al 2do indice que seria el numero [1] (0-1)

        if (!isNaN(num)) {   //verificamos que sea un numero, si no es isNaN 
            res.statusCode = 200   //Status code header
            res.end(JSON.stringify({ number: num, result: isPar(num) })); //json del numero y si es par
            return;
        }


    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ error: 'Numero no encontrado' }))   //si no es un numero retora numero no encontrado
    }

}

const server = http.createServer(processRequest)  //crea server con el proceso de processRequest

server.listen(3000, () => {
    console.log('listen on server 3000')   //llama al servidor
})