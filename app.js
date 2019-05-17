
var express = require('express')

var app = express()

var request = require('request')

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});
app.listen(port, function () {
 console.log(`Example app listening on port !`);
});

/*
1.- Agrega un endpoint '/api/' que responda a
una petición de tipo GET con un código de estado 200
y el siguiente json:
{'mensaje':'hola mundo'}
*/

app.get('/api', function(req, res)
{
    res.status(200).send({
        mensaje: 'hola mundo'
    })
})


/*
2.- Agrega un endpoint '/api/suma' que responda a una
petición de tipo GET con la suma de dos números que
reciba mediante las querys num1 y num2. El servidor
debe responder con un código de estado 200 y un json
como el siguiente:
{'resultado': 7}
*/

app.get('/api/suma', function(req, res)
{
    let {num1, num2} = req.query
    let resultado = parseInt(num1) + parseInt(num2)
    res.status(200).send({resultado})
})

// http://localhost:8001/api/suma?num1=3&num2=2

/*
3.- Agrega un endpoint '/api/usuario/' que responda a
una petición de tipo GET con el nombre que sea
recibido a través de params. El servidor debe responder
con un código de estado 200 y un json como este:
{'usuario': 'Edwin'}
*/

app.get('/api/usuario/:usuario', function(req, res)
{
    let usuario = req.params.usuario
    res.status(200).send({
        mensaje: usuario
    })
})

/*
4.- Agrega un endpoint '/api/swapi' que responda a una
petición de tipo GET con el personaje solicitado de
https://swapi.co/
El cliente debe mandar el número de personaje mediante
params. La respuesta del servidor debe lucir algo así
{'personaje': {
'name': 'Luke Skywalker',
...,
}}
*/

app.get('/api/swapi/:id', function(req, res)
{
    let id = req.params.id

    request.get(`https://swapi.co/api/people/${id}`, function(error, response, body)
    {
        let json = JSON.parse(body)

        let personaje = {
            name: json.name,
            height: json.height,
            mass: json.mass,
            hair_color: json.hair_color,
            skin_color: json.skin_color,
            eye_color: json.eye_color,
            birth_year: json.birth_year,
            gender: json.gender,
            homeworld: json.homeworld
        }
        
        res.status(200).send(personaje)
    })
})


/*Haz un endpoint q regrese a un pokemon pedido por id*/

var path = require('path')
app.use('/static', express.static(__dirname + '/pokemon'))

app.get(`/pokemon/:id`, function(req, res)
{
    var statusCode = 0
    var json

    request.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`, function(error, response, body)
    {
        json = JSON.parse(body)
        statusCode = response.statusCode

        let promesa = new Promise(function(resolve, reject)
        {
            if(statusCode >= 200 && statusCode <= 299)
            {
                resolve(json)
            }
            else
            {
                reject(new Error("No se encuentra el pokemon"))
            }
        })
    
        promesa
            .then(response=>res.sendFile(path.join(__dirname + `/pokemon/encontrado.html`)))
            .catch(error=>res.sendFile(path.join(__dirname + `/pokemon/noencontrado.html`)))
    })
})