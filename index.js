const Joi = require('joi');
const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('employeeDatabase', ['employees']);
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.send('Get request successful!!');
});

app.get('/api/employees', (req, res) => {
   // res.send(employees);
   db.employees.find(function(error, docs){
       console.log(docs);
       res.json(docs);
   });
});

app.get('/api/employees/:empId', (req, res) => {
    const id = req.params.empId; 
    console.log('get id'+id);
    db.employees.findOne({_id: mongojs.ObjectId(id)}, function(error, docs){
        res.json(docs);
    });
});

//Post API for adding name and id 
app.post('/api/addEmployee', (req, res) => {
    console.log(req.body);
    const {error} = Joi.validate(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
    }
    db.employees.insert(req.body, function(err, docs){
        res.json(docs);
    });
});

//update existing employee name by using id
app.put('/api/employees/:empId', (req, res) => {
    const id = req.params.empId; 
    console.log(req.body.emp_name);
    db.employees.findAndModify({query:{_id: mongojs.ObjectId(id)},
    update:{$set:{emp_name:req.body.emp_name, emp_id: req.body.emp_id}},
    new:true},
    function(error, docs){
        res.json(docs);
    });
});

//delete employee by employee id
app.delete('/api/removeEmployee/:id', (req, res) => {
    const id= req.params.id;
    console.log("ID is"+id);
    db.employees.remove({_id:mongojs.ObjectId(id)}, function(err, docs){
        res.json(docs);
    });
});

function validateBody(employeeName){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(employeeName, schema);
}

//for dynamic port
const PORT = process.env.PORT || 3000;

app.listen('3000', () => {
    console.log(`Listening on port ${PORT}`);
})