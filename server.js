var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/sample-app/dist/sample-app' ));
app.set("views", path.join(__dirname, "./views"));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/MExam");

var PetSchema = new mongoose.Schema(
    {
    name:{
        type: String, 
        required: [true, 'Pet name is required.'], 
        minlength: [3, 'Pet name must be at least 3 characters.'],
        trim: true
        },
    type: { 
        type: String, 
        required: [true, 'Pet type is required.'], 
        minlength: [3, 'Pet type must be at least 3 characters.'],
        trim: true
    },
    description: { 
        type: String, 
        required: [true, 'Pet description is required.'], 
        minlength: [3, 'Pet description must be at least 3 characters.'],
        trim: true
    },
    skill1: { 
        type: String, 
        trim: true
    },
    skill2: { 
        type: String, 
        trim: true
    },
    skill3: { 
        type: String, 
        trim: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    }, 
    {
    timestamps: true
    });

mongoose.model("Pet", PetSchema);
var Pet = mongoose.model("Pet");
mongoose.Promise = global.Promise;

app.get('/pets', function(request,response){
    Pet.find({}, function(error, data){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(data);
            response.json(data)
        }
    });
});

app.get('/pets/:id', function(request, response){
    console.log(request.params.id);
    Pet.findOne({
        _id: request.params.id
    },
    function(error, pet){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(pet);
            response.json({pet:pet})
        };
    });
});

app.post('/pets/new', function(request, response){
    console.log("AT POST DATA OF pets : " + request.body);
    var pet = new Pet({
        name: request.body.name,
        type: request.body.type,
        description: request.body.description,
        skill1: request.body.skill1,
        skill2: request.body.skill2,
        skill3: request.body.skill3,
    });
    pet.save(function (error, data){
        if(error){
            console.log(error);
            response.json(error);
        } else {
            console.log(data);
            response.json(data)
        };
    });
});

app.put('/pets/:id/edit', function(request, response){
    Pet.findByIdAndUpdate({ _id: request.params.id }, {$set: {name: request.body.name, type: request.body.type, description: request.body.description, skill1: request.body.skill1, skill2: request.body.skill2, skill3: request.body.skill3}}, {new:true, runValidators: true} , function (error, pet) {
        if (error) {
            response.json(error)
        } else {
            response.json({ message: "Success", data: pet })
        }
    })
    });


app.delete('/pets/:id', function(request, response){
    console.log(request.params.id);
    Pet.remove({
        _id: request.params.id
    }, function(error){
        if(error){
            console.log(error);
            response.json({
                message: "Error at REMOVE by ID Route",
                error: error
            });
        } else {
            console.log("REMOVED pet by ID.");
            response.json({
                message: "REMOVED pet by ID.",
            });
        };
    });
});

app.listen(8000, function(){
    console.log("LISTENING on Port 8000!");
});



// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./sample-app/dist/sample-app/index.html"))
});
