var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var hostname = 'localhost';
var port = 8080;
var jsonParser = bodyParser.json();
var app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

var dishRouter = express.Router();

var express = require('express');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name){
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id){
    if (!this.items[id]){
        //
    }
    else {
        return this.items.splice(id, 1)
    }
    return this.items
}

Storage.prototype.update = function(id, name){
    if (this.items[id]) {
        this.items[id].name = name
    }
    else {
        storage.add(name);
    }
    return this.items
}
var storage = new Storage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');


app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {
    if (!request.body){
        return response.sendStatus(400);
    }
    var item = storage.delete(request.params.id)
    console.log("delete"+item)
    response.status(200).json(item);
    });

app.put('/items/:id/:name', jsonParser, function(request, response){
    if (!request.body){
        return response.sendStatus(400);
    }
    var id = request.params.id
    var name = request.params.name
    var item = storage.update(id, name)
    console.log("put"+item)
    response.status(200).json(item)
});

app.use('/dishes', dishRouter);
app.use(express.static(__dirname+'/public'));

app.listen(port, hostname, function(){
	console.log('server is running on '+hostname+':'+port+'but not as fast as me wheeee');
})