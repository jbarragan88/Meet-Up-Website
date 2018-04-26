// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var bcrypt = require('bcrypt');
var session = require('express-session');

var Schema = mongoose.Schema;

require('mongoose-type-email');
// Use native promises
mongoose.Promise = global.Promise;
// Require path
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/meetup');
//Users Collection
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Missing Name"],
        minlength: [4, "Name Must Be longer than 4 Characters"],
        maxlength: [30, "First Name Must Be Shorter Than 30 Characters"]
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        required: [true, "Missing Email"]
    },
    password: {
        type: String
    }
}, {timestamps: true } )
mongoose.model('User', UserSchema); 
var User = mongoose.model('User') ;

UserSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.validPassword = function(password1, password2){
    return bcrypt.compareSync(password1, password2)
}
//Event Collection
var EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Missing Event Name"],
        minlength: [5, "Event Name Must Be longer than 5 Characters"],
        maxlength: [40, "Event Name Must Be Shorter Than 40 Characters"]
    },
    description: {
        type: String,
        required: [true, "Missing Description"],
        minlength: [50, "Description Must Be longer than 50 Characters"],
        maxlength: [400, "Description Must Be Shorter Than 400 Characters"]
    },
    topics: []
}, {timestamps: true } )
mongoose.model('Event', EventSchema); 
var Event = mongoose.model('Event') 

//*
//*
//
//*
//*
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
app.use(express.static( __dirname + '/website/dist' ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
//*
//*
//
//*
//*
// Routes
//Register User
app.post('/api/create/user', function(req, res){
    console.log("Server Register User", req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: UserSchema.methods.hashPassword(req.body.password)
})
    user.save(function(err){
        if(err){
            console.log("Server could not Register Error:", err);
            var message = {message: "Error", data: err};
            if(req.body.name < 4 || !req.body.name ){
                message.name = "Invalid";
            }
            res.json(message)
        }
        else{
            User.findOne({email: req.body.email}, function (err, user){
                req.session.user = user._id
                console.log("Successful Register");
                res.json({message: "Success", data: user})
            })
        }
    })
    console.log("Server Added User", user);
});

//Login User
app.post('/api/login/user', function(req, res){
    console.log("Server Login User", req.body);
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Server cannot log in this user Error:", err);
            res.json({message: "Error", data: err})
        }
        else{
            console.log("Server Login User Success User:", user)
            req.session.user = user._id
            console.log("Success Loggin In");
            res.json({message: "Success", data: user})
        }
    })
});

// app.post('/api/edit', function(req, res){
//     console.log("Server Edit Product", req.body, "ID:", req.params.id);
//     // if(req.body.name.length < 4){
//     //     res.json({messagee: "Error"})
//     // }
//         Product.update({_id: req.body.id}, {$set: {title: req.body.title, price: req.body.price, image: req.body.image}},{ runValidators: true }, function(err, author){
//             if(err){
//                 var message = {message: "Error", data: err};
//                 if(req.body.price == 0 || !req.body.price ){
//                     message.price = "Invalid";
//                 }
//                 res.json(message)
//             }
//             else if(req.body.price == 0 || !req.body.price ){
//                 var message = {message: "Error"};
//                 message.price = "Invalid";
//                 res.json(message)
//             }
//             else{
//                 res.json({message: "Success", data: "made it"})
//             }
//         })

// });

// app.get('/api/get/:id', function(req, res){
//     Product.findOne({_id: req.params.id}, function(err, product){ 
//         if(err){
//             console.log("Server Finding Author error:", err)
//         }
//         else{
//             res.json({data: product});
//         }
//     })

// });

// app.get('/api/all', function(req, res){

//     Product.find({}, function(err, products) {
//         if(err){
//             console.log("The server was not able to find shit..", err);
//             res.json({message: "Error", error: err});
//         }
//         else{
//             console.log("Successful On Finding Products", products);
//             res.json({message: "Success", data: products});
//         }
//     })
// });

// app.get('/api/delete/:id', function(req, res){
//     Product.find({_id: req.params.id}, function(err, product){
//         if(err){
//             console.log("Server Didn't Find product to delete", err);
//             res.json({message: "Error"});
//         }
//         else{
//             console.log("Server Found author to delete", product);
//             Product.remove({_id: req.params.id}, function(err){
//                 res.json({message: "Success"});
//             })
//         }
//     })
// });

app.all("*", (req,res,next) => {
    console.log("to the back you go")
    res.sendFile(path.resolve("./website/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})