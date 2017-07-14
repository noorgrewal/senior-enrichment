'use strict'
const api = require('express').Router();
const db = require('../db');
const models=require('../db/models');
const Students=models.Student;
const Campuses=models.Campus;
const Users=models.User;
module.exports = api;

// STUDENTS
// GET ALL
api.get('/students', (req, res, next) => {
    Students.findAll({ include: [ Campuses ], order: '"firstName" ASC' })
    .then(function(students) {
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
            if(data){res.json(data)}
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

    Students.create({
        firstName: studentFirst,
        lastName: studentLast,
        email: studentEmail,
        image: studentImage,
        campusId: studentCampus
    })
    .then(function (data) {
        res.sendStatus(201);
    })
    .catch(next);

});

api.put('/students/edit/:studentId', (req, res, next) => {
    var studentId=req.params.studentId;
    var studentFirst=req.body.firstName;
    var studentLast=req.body.lastName;
    var studentEmail=req.body.email;
    var studentImage=req.body.image;
    var studentCampus=Number(req.body.campusId);

    if(!Number(studentId)){res.sendStatus(500);}
    else{
        Students.findById(studentId)
        .then(function (data) {
            if(data){
                data.update({
                    firstName: studentFirst,
                    lastName: studentLast,
                    email: studentEmail,
                    image: studentImage,
                    campusId: studentCampus
                })
                .then(function() {
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
// GET ALL
api.get('/campuses', (req, res, next) => {
    Campuses.findAll({ include: [ Students ], order: '"name" ASC' })
    .then(campuses=>{
        res.json(campuses);
    })
    .catch(next);
});

// GET BY ID
api.get('/campuses/:campusId', (req, res, next) => {
    var campusId=req.params.campusId;
    if(!Number(campusId)){res.sendStatus(500);}
    else{
        Campuses.findById(campusId)
        .then(function (data) {
            if(data){
                res.json(data);
            }
            else{
                res.sendStatus(404);
            }
        });
    }
});

// GET STUDENTS IN CAMPUS
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

// ADD CAMPUS
api.post('/campuses/new', (req, res, next) => {
    console.log('HELLO',req.body);
    var campusName=req.body.name;
    var campusImage=req.body.image;

    Campuses.create({name:campusName,image:campusImage})
    .then(function (data) {
        console.log("DATA",data);
        res.status(201);
        res.send(data);
    })
    .catch(next);

});

// EDIT CAMPUS
api.put('/campuses/edit/:campusId', (req, res, next) => {
    console.log('HELLO',req.body,req.params.campusId);

    var campusId=req.params.campusId;
    var campusName=req.body.name;
    var campusImage=req.body.image;

    if(!Number(campusId)){res.sendStatus(500);}
    else{
        Campuses.findById(campusId)
        .then(function (data) {
            if(data){
                data.update({
                    name: campusName,
                    image: campusImage
                })
                .then(function() {
                    res.send(data);
                });

            }
            else{
                res.sendStatus(404);
            }
        });
    }

});

// DELETE CAMPUS
api.delete('/campuses/:campusId', (req, res, next) => {
    var campusId=req.params.campusId;

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
                });
            }
            else {
                res.sendStatus(404);
            }
        });
    }

});


// JUST IN CASE I DO A LOGIN
api.get('/users', (req, res, next) => {
    console.log('users');
    res.send('Users');
});

