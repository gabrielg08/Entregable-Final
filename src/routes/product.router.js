const {getAll, create, remove, update} = require('../controllers/product.controllers')
const express = require('express')
const verifyJWT = require('../utils/verifyJWT')
const { getOne } = require('../controllers/product.controllers')


const routerProduct = express.Router()

routerProduct.route('/')
    .get(getAll)
    .post(verifyJWT, create)


routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update)

module.exports = routerProduct