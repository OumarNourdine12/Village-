const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/apiRouter').router;
const helmet = require('helmet');
const logger = require('morgan');
const { notFoundHandler, errorLogger, errorHandler } = require('./middlewares');

const app = express()
const port = process.env.PORT || 4000

//Helmet pour la confiration des erreurs 
app.use(helmet());

//Morgan
app.use(logger('tiny'));

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cors
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

//configure routes
app.get('/', function (request, response) {
    response.json({ message: 'salut tout le monde!' });
});
// afficher village dans la route 
app.use('/village', apiRouter);

app.use('*', notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

app.listen(port, function () {
    console.log('Le serveur fonctionne sur le port : ' + port)
})