const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const createError = require('http-errors');
const app = express();


// view engine setup
app
    .set('views', path.resolve(__dirname, './views'))
    .set('view engine', 'ejs');

app
    .use(express.static(path.resolve(__dirname, '../public')))
    .use(express.json())
    //URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
    .use(express.urlencoded({ extended: false }))
    //Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
    .use(methodOverride('_method'));

//routes

const {genresRoutes, moviesRoutes, actorsRoutes} = require('./v1/routes');
const errorResponse = require('./helpers/errorResponse');

app
    .use('/api/v1/movies',moviesRoutes)
    .use('/api/v1/genres',genresRoutes)
    .use('/api/v1/actors',actorsRoutes);

// catch 404 and forward error handler
app.use(function(req,res,next){
    next(createError(404, 'Endpoint inexistente'));
});

// error handler
app.use(function(error,req,res,next){
    return errorResponse(res,error)
});

//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
