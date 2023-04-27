const {validationResult} = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const { getAllgenres, getOneGenre, createGenre, deleteGenre, updateGenre } = require('../services/genresServices');

module.exports =  {
    'list': async (req, res) => {

        try {
           const genres = await getAllgenres();

            return res.status(200).json({
                ok: true,
                data: genres,
                meta: {
                    status: 200,
                    //total: genres.length,
                    url: '/api/genres'
                }
            });

        } catch (error) {
            return errorResponse(res,error)
        }


    },
    'detail': async (req, res) => {
        
        try {

            const {
                params: {id}
            } = req;

            const genre = await getOneGenre(id)

            return res.status(200).json({
                ok: true,
                data: genre,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${id}`
                },
                
            })

        }catch(error){
            return errorResponse(res,error)
        }     
    },
    'store': async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }

            const newGenre = await createGenre(req.body);
            return res.status(200).json({
                ok: true,
                data: newGenre,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${newGenre.id}`
                }
            });
        } catch (error) {
            return errorResponse(res,error)
        }

    },
    'update': async (req, res) => {
        try {
            const {
                params: {id}
            } = req;
            const errors = validationResult(req);

            if(!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }

            const updatedGenre = await updateGenre(id, req.body);
            return res.status(200).json({
                ok: true,
                data: updatedGenre,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${id}`
                }
            });
        } catch (error) {
            return errorResponse(res,error)
        }

    },
    'destroy': async (req, res) => {
        try {
            const {
                params: {id}
            } = req;

            const deletedGenre = await deleteGenre(id)
            
            return res.status(200).json({
                ok: true,
                data: deletedGenre,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${deletedGenre.id}`
                }
            });
        } catch (error) {
            return errorResponse(res,error)
        }}
}

