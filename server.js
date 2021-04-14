// const e = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require ('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'WhatInTheHell?',
    database: 'smart-brain',
  },
});

// postgres.select('*').from('users').then(data => {
//   console.log(data);
// });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send(database.users);});
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, postgres, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, postgres, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, postgres)});
app.put('/image', (req, res) => {image.handleImage(req, res, postgres)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);