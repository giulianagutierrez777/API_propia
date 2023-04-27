const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


module.exports = {
    'list': async (req, res) => {

        try {
            const movies = await db.Movie.findAll();

            return res.status(200).json({
                ok: true,
                data: movies,
                meta: {
                    status: 200,
                    total: movies.length,
                    url: '/api/movies'
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: error.message
            })
        }

    },
    'detail':
        async (req, res) => {

            try {

                const { id } = req.params;

                const movie = await
                    db.Movie.findByPk(id)

                return res.status(200).json({
                    ok: true,
                    data: movie,
                    meta: {
                        status: 200,
                        total: 1,
                        url: `/api/movies/${id}`
                    },

                })

            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    msg: error.message
                });
            }
    },
    //Aqui dispongo las rutas para trabajar con el CRUD

    create: function (req, res) {
        const {title,rating,awards,release_date,length,genre_id} = req.body
        Movies
            .create(
                {
                    title: title.trim(),
                    rating: rating,
                    awards: awards,
                    release_date: release_date,
                    length: length,
                    genre_id: genre_id
                }
            )
            .then((movie) => {
                return res.status(200).json({
                    ok: true,
                    data: movie,
                    meta: {
                        status: 200,
                        url: `/api/movies/create`
                    }})
            })
            .catch(error => res.send(error))
    },
    update: function (req, res) {
        const movieId = req.params.id;
        const {title,rating,awards,release_date,length,genre_id} = req.body
        
            db.Movie.update(
                {
                    title: title,
                    rating: rating,
                    awards: awards,
                    release_date: release_date,
                    length: length,
                    genre_id: genre_id
                },
                {
                    where: { id: movieId }
                })
                .then((movie) => {
                    console.log(movie)
                    return res.status(200).json({
                        ok: true,
                        data: movie,
                        meta: {
                            status: 200,
                            url: `/api/movies/${id}`
                        }})
            })
            .catch(error => res.send(error))
    },
    destroy: (req, res) => {
        db.Movie.destroy({
            where: {id: req.params.id}, force: true
        }).then(response => {
            return res.json(response)
        }).catch(errors => console.log(errors))
    }
          
}

