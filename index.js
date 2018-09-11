const Joi = require('joi');
const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('employeeDatabase', ['employees']);
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

const employees = [
    {name:"Emp1", id:1001, designation:'UI Developer'},
    {name:"Emp2", id:1002, designation:'Java Developer'},
    {name:"Emp3", id:1003, designation:'Python Developer'},
    {name:"Emp4", id:1004, designation:'SASS Developer'},
    {name:"Emp5", id:1005, designation:'.Net Developer'}
]
app.get('/',(req, res) => {
    res.send('Get request successful!!');
});

app.get('/api/employees', (req, res) => {
   // res.send(employees);
   db.employees.find(function(error, docs){
       console.log(docs);
       res.json(docs);
   })
});

app.get('/api/employees/:empId', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.empId));
    if(!employee){
        res.status(404).send(`Employee with ID ${req.params.empId} not found`);
        return;
    }else{
        res.send(employee);
    }
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
    const employee = employees.find(emp => emp.id === parseInt(req.params.empId));
    if(!employee){
        res.status(400).send(`no employee found with id ${req.param.empId}`);
        return;
    }
    const { error } = Joi.validate(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
    }
    employee.name = req.body.name;
    res.send(employee);
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