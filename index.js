var express = require('express')
var bodyParser = require('body-parser');

var app = express()
app.use(express.static('static'));
const port = 3000
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
    // console.log(req)
    res.render('frontend', {
        title: "The Farmer’s Market",
        data: []
    });
    //res.json(student);

});
app.post('/', function(req, res) {


    var input = req.body.Basket.split(',')
    console.log(input);
    var cart = require('./cart.js');
    var finalcart = new cart(input);
    console.log(finalcart)
    res.send({
        title: "The Farmer’s Market",
        data: finalcart
    });

    //res.json(student);


});
app.listen(port)