const express = require('express');
const app = express();
const port = 7000;
const logger = require('morgan');
const path = require('path');
const mongoose = require ('mongoose')
const User = require ('./models/User.js');
const bcrypt = require('bcryptjs')


// DB connection

mongoose.connect("mongodb://localhost/MySite")
.then(response => console.log('Database Connected Successfully '))
.catch(error => console.log(`Database connection: ${error}`))


// morgan setup
app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//creating the route for homepage
app.get('/', (req, res)=> {
    const allPosts = [
        {
            img:'/assets/images/bmw interior.jpg',
            title:'first post',
            content: "Nice interiorm"
        },

        {
            img:'/assets/images/bmw interior.jpg',
            title:'Second Post',
            content: "Compare the interior of these cars to select your preference and give reasons why you arrived at you decision"
        },

        {
            img:'/assets/images/bmw interior.jpg',
            title:'Third Post',
            content: "Compare the interior of these cars to select your preference and give reasons why you arrived at you decision"
        },

        {
            img:'/assets/images/bmw interior.jpg',
            title:'BMW',
            content: "Compare the interior of these cars to select your preference and give reasons why you arrived at you decision"
        },


    ];

    res.render('home', {allPosts});
});

app.get('/login', (req, res)=> {
    res.render('login');
});

app.get('/register', (req, res)=> {
    res.render('register');

}); 

app.post('/User/register', async (req, res)=> {
    let {userName, password, confirmPassword, email, summary, image} = req.body;
     if(password >= 6) {
        console.log("password must be greater than six")

     }else if(password != confirmPassword) {
        console.log("password not the same")
      
      }
      
    let userExist = await User.findOne({email})
    if(userExist) {
        console.log('User already exist')
    }else{

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = new User({
            userName,
            password: hashedPassword,
            email,
            summary,
            image
        })
        newUser = await newUser.save();
        if(!newUser){
            console.log('something wenr wrong')
        }else{
            console.log(`Registration successful ${newUser}`)
        }
    
    }
  
});

app.get('/new-post', (req, res)=> {
    res.render('newPost');


});


app.listen(port, () => console.log(`server running on ${port}`));