const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Spiderman46',
        database: 'smart_brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data)
// });

//create a port variable to use, if no PORT is found, use 3001
const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.urlencoded({extended: true}));//bodyparser
app.use(express.json());//bodyparser
app.use(cors());



app.get('/', (req, res) => {
    res.send('it is working')
})

////////////////////// pass dependencies to ./controller/<file name>.js

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req,res,db,bcrypt) })

app.get('/profile/:id', (req, res, db) =>{profile.handleProfile(req, res, db)} )

app.put('/image', (req,res,) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req,res,) => {image.handleAPICall(req, res,)})





//set up PORT env variable
// in bash shell---> PORT=3000 node <file name> 
//in the server.js file
// const PORT = proccess.env.PORT

app.listen(PORT, () => {
    console.log(`app is runnin on ${PORT}`)
})

//  '/' res= this is working
// '/signin' POST = success/ fail
// '/register' POST = user
// '/profile/:id'  = GET = user
// '/image' = PUT = user

