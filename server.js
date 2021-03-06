const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');
const tinyUrl = require('./controllers/tinyUrl')

//Database Setup
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();
const port = process.env.PORT || 3000

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    console.log('origin=>>>>', origin)
    callback(null, true)
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  }
}

app.use(morgan('combined'));
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) })
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res) })
app.get('/shortenurl/:url', async (req, res) => { tinyUrl.handleUrlRedirect(req, res, db) })
// app.post('/shortenurl', auth.requireAuth, (req, res) => {tinyUrl.handleUrlShorten(req, res)})
app.post('/shortenurl', async (req, res) => { tinyUrl.handleUrlShorten(req, res, db) })

app.listen(port, () => {
  console.log('app is running on port 3000');
})
