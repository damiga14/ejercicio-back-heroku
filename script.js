var express = require('express')

var app = express()

// var cowsay = require("cowsay");

// var hola = (cowsay.say({
//     text : "I'm a moooodule",
//     e : "oO",
//     T : "U "
// }));

var hola = "Mi API"

app.get('/api/david/clase8', function (request, response) {
    response.send({ 
        mensaje: 'hola'
    })
  })
   
app.get('/character/:id', function(require, response)
{
    console.log(require.params)
    let id = require.params.id
    response.send(`Personaje buscado es el ${id}`)
})

app.listen(8000, function()
{
    console.log('Servidor en puerto 8000')
})




var path = require('path');

app.use('/static', express.static(__dirname + '/website'))

app.get('/haber', function(require, response)
{   
    response.sendFile(path.join(__dirname + '/website/index.html'))
})