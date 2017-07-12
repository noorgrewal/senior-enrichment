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
    var studentFirst=req.body.firstName;
    var studentLast=req.body.lastName;
    var studentEmail=req.body.email;
    var studentImage=req.body.image;
    var studentCampus=Number(req.body.campusId);
    console.log("TEST", req.body);

    Students.create({
        firstName: studentFirst,
        lastName: studentLast,
        email: studentEmail,
        image: studentImage,
        campusId: studentCampus
    })
    .then(function (data) {
        console.log("DATA",data);
        res.sendStatus(201);
        // res.send(data);
        // res.redirect()
    })
    .catch(next);


    // Campuses
    // .findOrCreate({where: {id:studentCampus}})
    // .spread(function(campus, created) {
    //     console.log("ass",campus.get({
    //         plain: true
    //     }));
    //     console.log(created);
    //     Students.create({
    //         firstName: studentFirst,
    //         lastName: studentLast,
    //         email: studentEmail,
    //         image: studentImage,
    //         campusId: campus.id
    //     })
    //     .then(function (data) {
    //         console.log('no dice');
    //         res.status(201);
    //         res.send(data);
    //     });
    // });

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

    // Students.destroy({
    //     where: {
    //         id: e.target.id
    //     }
    // })
    // .then(function (data) {
    //     console.log("data",data);
    //     if(data===0){res.sendStatus(404);}
    //     else{
    //         res.status(204);
    //         res.send('done');
    //     }
    //
    // })
    // .catch(next);

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

api.post('/campuses/new', (req, res, next) => {
    console.log('HELLO',req.body);
    var campusName=req.body.name;
    var campusImg=req.body.image;
    Campuses.create({name:campusName,image:campusImg})
    .then(function (data) {
        console.log("DATA",data);
        res.status(201);
        res.send(data);
    })
    .catch(next);

    // Playlist.create(req.body)
    //     .then(playlist => res.status(201).json(playlist))
    //     .catch(next);
});


api.delete('/campuses/:campusId', (req, res, next) => {
    var campusId=req.params.campusId;

    // if students are still attached to campus
    // must re route first



    if(!Number(campusId)){res.sendStatus(500)}
    else {
        Campuses.findById(campusId)
        .then(function (data) {
            // console.log(data);
            if (data) {
                res.status(204);
                data.destroy({force: true})
                    .then(function (data) {
                        res.send(data);

                        // re-query send back data of all campuses
                        // doesn't work
                        // Campuses.findAll({})
                        // .then(campuses => {
                        //     console.log("campuses========",campuses[0],"campuses========");
                        //     res.send(campuses[0]);
                        // })
                        // .catch(next);
                    });
            }
            else {
                res.sendStatus(404);
            }
        });
    }
});

module.exports = api;