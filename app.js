const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:1234@ec2-52-22-19-172.compute-1.amazonaws.com/admin');
const People = mongoose.model('person', { name: String});
const express = require('express')
const app = express()
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', '1234', {
    host: 'ec2-52-22-19-172.compute-1.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
});
const User = sequelize.define('user', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(45),
        }
    },
    {
        timestamps: false
});
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
app.get('/', function (req, res) {
    res.send("hello world")
})

app.get('/peopleRel', function (req, res) {
    User.findAll()
    .then(function(users){
        res.send(users)
    })
})

app.get('/peopleNonRel', function (req, res) {
    People.find()
    .then(function(people){
        res.send(people)
    })
    .catch(function(err){
        console.log(err)
    })
})

app.listen(3000, function () {
    console.log("Listening on port 3000")
})