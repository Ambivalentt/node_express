const http = require('node:http');
const url = require('node:url');

const processRequest = (req, res) =>{
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const parsedUrl = url.parse(req.url, true); //parse obtiene el url http://localhost/pathname [cualquier cosa que pongamos]
    const pathname = parsedUrl.pathname; //obtenemos el pathname 
    const name = parsedUrl.query.name; //query metodo de parse donde se agrega query:name 
                                             // [name: nombre por ingresar]

    if(pathname === '/saludo'){  //si el pathname es saludo se ejecuta
        if(name){
            res.statusCode = 200,
            res.end(JSON.stringify({saludos: name}))
        }else{
            res.statusCode = 404,
            res.end(JSON.stringify({error: 'Parametro invalido'}))
        }
    }else{
        res.statusCode = 404
        res.end(JSON.stringify({error:'Error 404 not found'}))
    }
   
}

const server = http.createServer(processRequest)

server.listen(3000, () =>{
    console.log('server listening on port 3000')
})