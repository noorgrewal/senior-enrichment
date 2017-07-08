'use strict'
const routes = require('express').Router()

routes.get('/hello', (req, res) => res.send({hello: 'world'}))

module.exports = routes