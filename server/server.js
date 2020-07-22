const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var cors = require('cors')

var app = express()
 
app.use(cors())
app.use(cookieParser())


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth');

app.use(bodyParser.json());

const {User } = require('./models/user');

app.post('/api/user',(req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })

    user.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(doc);
    })
})
app.post('/api/login',(req,res) => {
    User.findOne({email: req.body.email},(err,user)=>{
        if(!user) return res.status(200).send('fail')
        if (err) return res.status(200).send('fail');
        if (req.body.password === user.password)
        if (user.email.includes('msrit'))
        res.status(200).cookie('auth','loggedin').cookie('role','admin').send('logged-admin')
        else 
        res.status(200).cookie('auth','loggedin').cookie('role','user').send('logged-user')

        else
        res.status(200).send('fail')
    })
})

app.get('/',(req,res)=>{
    res.send('heyyy')
})
const port = 3001;

app.listen(port,()=>{
    console.log('Started port at 3001');
    
})