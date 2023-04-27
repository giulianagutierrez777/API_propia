const router = require('express').Router();

const {list, detail, create, update, destroy} = require('../../controllers/moviesController');

/* /api/v1/movies */

router.get('/', list);
router.get('/detail/:id', detail);
//Rutas exigidas para la creación del CRUD
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

module.exports = router;