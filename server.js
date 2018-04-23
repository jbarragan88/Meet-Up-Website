// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// var Schema = mongoose.Schema;

// // Use native promises
// mongoose.Promise = global.Promise;
// // Require path
// // This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
// //   our db in mongodb -- this should match the name of the db you are going to use for your project.
// mongoose.connect('mongodb://localhost/product');
// var ProductSchema = new mongoose.Schema({
//     title: {type: String, required: [true, "Missing Name"], minlength: [4, "Title Must Be longer than 4 Characters"]},
//     price: {type: Number, required: [true, "Missing Price"]},
//     image: {type: String}
// }, {timestamps: true } )
// mongoose.model('Product', ProductSchema); 
// var Product = mongoose.model('Product') 

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
app.use(express.static( __dirname + '/websiteApp/dist' ));
app.use(bodyParser.urlencoded({extended: true}));
//*
//*
//
//*
//*
// Routes
// Root Request
// app.post('/api/create', function(req, res){
//     console.log("Server Add Product", req.body);
//     var product = new Product({title: req.body.title, price: req.body.price, image: req.body.image})
//     product.save(function(err){
//         if(err){
//             var message = {message: "Error", data: err};
//             if(req.body.price == 0 || !req.body.price ){
//                 message.price = "Invalid";
//             }
//             res.json(message)
//         }
//         else if(req.body.price == 0 || !req.body.price ){
//             var message = {message: "Error"};
//             message.price = "Invalid";
//             res.json(message)
//         }
//         else{
//             res.json({message: "Success", data: "made it"})
//         }
//     })
//     console.log("Server Added Author", product);
// });

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
    res.sendFile(path.resolve("./websiteApp/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})