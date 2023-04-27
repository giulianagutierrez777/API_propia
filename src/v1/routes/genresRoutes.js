const router = require('express').Router();

const {list, detail, store, update, destroy} = require('../../controllers/genresController');
const genresValidator = require('../../validations/genresValidator');

/* /api/v1/genres */

router.get('/', list);
router.get('/:id', detail);
router.post('/',genresValidator, store);
router.put('/:id', update);
router.delete('/:id', destroy);


module.exports = router;