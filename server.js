var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	Car = require('./app/models/car'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://capote:capote123@ds127954.mlab.com:27954/catolica-nosql');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/templates', express.static(__dirname + '/templates'));



app.use(function (req, res, next) {
	res.append('Access-Control-Allow-Methods', 'DELETE')
	res.append('Access-Control-Allow-Methods', 'PUT')
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
var routes = require('./app/routes/routes');
routes(app);

app.get('*', function (req, res) {

	res.sendFile('index.html', { root: __dirname + '/templates' })
})

app.listen(process.env.PORT || 8000);