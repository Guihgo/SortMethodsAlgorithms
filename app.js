var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
const opn = require('opn');
var fs = require('fs');

const httpPort = process.env.PORT || 80;
server.listen(httpPort);
console.log('Servidor http rodando na porta: '+httpPort);
const dominio = 'http://127.0.0.1:'+httpPort;
console.log('Para visualizar a aplicação, visite: '+dominio);
opn(dominio);

app.use(express.static(path.join(__dirname, 'public'))); //static files to web

/* Express routers... */
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html')); //send index_compiled.html (file comopiled with Atomic) to router /
});
