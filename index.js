var lti = require("./lti.js");
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.enable('trust proxy');

app.use(function (req, res, next) {
    res.setHeader('X-Frame-Options', "Deny");
    next();
});



var cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081','http://localhost:3333','http://localhost:8011', 'http://157.253.224.72:3000'],
    credentials: true
}));

app.post('/access', function (req, res, next) {
    console.log("Coursera response 2 POST:/access/", req.body);
    lti.registrarIngeso(req).then(function (resp) {
        console.log("LTI PARAMS: ", resp);
        var userId = resp.userId;
        var examenId = resp.examenId;
        console.log("USUARIO DE COURSERA ID: ", userId, "INGRESANDO AL EXAMEN", examenId);
        res.redirect('/success');
});
});

app.get('/success', function(req,res,next)
{
    res.end("Success");
});
app.listen(3333, () => console.log(`App listening on port 3333`));
module.exports = app;
