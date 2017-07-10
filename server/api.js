'use strict'
const api = require('express').Router();
const db = require('../db');
const models=require('../db/models');
const Students=models.Student;
const Campuses=models.Campus;
const Users=models.User;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}));

//place apis with sequelize calls here to make json files for ajax calls
api.get('/users', (req, res, next) => {
    console.log('users');
    res.send('Users');
});



// STUDENTS
api.get('/students', (req, res, next) => {
    // Students.findAll({})
    // .then(students => res.json(students))
    // .catch(next);

    Students.findAll({ include: [ Campuses ], order: '"firstName" ASC' })
    .then(function(students) {
        // console.log(JSON.stringify(students));
        res.json(students);
    })
    .catch(next);

});

api.get('/students/:studentId', (req, res, next) => {
    var studentId=req.params.studentId;
    if(!Number(studentId)){res.sendStatus(500);}
    else{
        Students.findAll({where:{id:studentId},include: [ Campuses ]})
        .then(function (data) {
            // console.log(data);
            if(data){res.json(data);}
            else{
                res.sendStatus(404);
            }
        });
    }
});

api.post('/students/new', (req, res, next) => {
    Students.create({title:'blah'})
    .then(function (data) {
        res.status(201);
        res.send(data);
    });
});

api.put('/students/:studentId', (req, res, next) => {
    var studentId=req.params.studentId;
    var studentInfo='blah';

    if(!Number(studentId)){res.sendStatus(500);}
    else{
        Students.findById(studentId)
        .then(function (data) {
            if(data){
                data.update({
                    title: 'blah'
                }).then(function() {
                    res.send(data);
                });
            }
            else{
                res.sendStatus(404);
            }
        });
    }
});

api.delete('/students/:studentId', (req, res, next) => {
    var studentId=req.params.studentId;

    if(!Number(studentId)){res.sendStatus(500)}
    else {
        Students.findById(studentId)
        .then(function (data) {
            // console.log(data);
            if (data) {
                res.status(204);
                data.destroy({force: true})
                    .then(function (data) {
                        res.send(data);
                    });
            }
            else {
                res.sendStatus(404);
            }
        });
    }
});



// CAMPUS
api.get('/campuses', (req, res, next) => {
    Campuses.findAll({})
        .then(campuses => res.json(campuses))
        .catch(next);
});

api.get('/campuses/:campusId', (req, res, next) => {
    var campusId=req.params.campusId;
    if(!Number(campusId)){res.sendStatus(500);}
    else{
        Campuses.findById(campusId)
        .then(function (data) {
            if(data){res.json(data);}
            else{
                res.sendStatus(404);
            }
        });
    }
});

api.get('/campuses/:campusId/students', (req, res, next) => {
    var campusId=req.params.campusId;
    if(!Number(campusId)){res.sendStatus(500);}
    else{
        Students.findAll({where:{campusId:campusId},include: [ Campuses ], order: '"firstName" ASC'})
        .then(function (data) {
            if(data){res.json(data);}
            else{
                res.sendStatus(404);
            }
        });
    }

});

// how do i do these routes under /api
// ive been using react routes to 'render' views, so no express routes
// now I must do a post from a react route! how does that work with the paths?
// do I make a traditional express route or leave it in here?
api.post('/campuses/new', (req, res, next) => {
    console.log(req.body);
    // Campuses.create({title:'blah'})
    //     .then(function (data) {
    //         res.status(201);
    //         res.send(data);
    //         do a redirect
    //     });

    // Playlist.create(req.body)
    //     .then(playlist => res.status(201).json(playlist))
    //     .catch(next);
});

module.exports = api;