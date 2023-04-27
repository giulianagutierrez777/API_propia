const db = require('../database/models');

module.exports = {
    getAllgenres : async () => {
        try {
            const genres = await db.Genre.findAll();
            return genres
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        } 
    },
    getOneGenre : async (id) => {
        try {
            const genre = await db.Genre.findByPk(id);
            return genre
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    createGenre: async (data) => {
        try {
            const newGenre = db.Genre.create({
                ...data
            });
            return newGenre
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    deleteGenre: async (id) => {
        try {
            const deletedGenre = db.Genre.destroy(
                { where: { id }, force: true 
            });
            return deletedGenre
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }},
    updateGenre: async (id, data) => {
            try {
                const updatedGenre = db.Genre.update({
                    ...data
                },
                {where: {
                    id
                }});
                return updatedGenre
            } catch (error) {
                throw {
                    status : 500,
                    message : error.message
                }
            }}

}