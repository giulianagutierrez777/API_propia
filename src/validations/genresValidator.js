const {check} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('el campo requiere un nombre'),
    check('ranking')
    .notEmpty()
    .withMessage('el campo ranking es obligatorio'),
    check('active')
    .notEmpty()
    .withMessage('el campo active es obligatorio')
]