'use strict'
const api = require('express').Router();
const db = require('../db');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}));

//place apis with sequelize calls here to make json files for ajax calls
api.get('/users', (req, res) => res.send({hello: 'world'}));
api.get('/campus', (req, res) => res.send({hello: 'campus'}));
api.get('/student', (req, res) => res.send({hello: 'student'}));
api.get('/instructor', (req, res) => res.send({hello: 'instructor'}));

module.exports = api;