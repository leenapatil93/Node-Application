const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const employees = [
    {name:"Emp1",id:1001},
    {name:"Emp2",id:1002},
    {name:"Emp3",id:1003},
    {name:"Emp4",id:1004},
    {name:"Emp5",id:1005}
]
app.get('/',(req, res) => {
    res.send('Get request successful!!');
});

app.get('/api/employees', (req, res) => {
    res.send(employees);
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
    const {error} = Joi.validate(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
    }
    const emp = {
        name: req.body.name,
        id:1006
    };
    employees.push(emp);
    res.send(emp);
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
app.delete('/api/removeEmployee/:empId', (req, res) => {
    //lookup the employee
    const employee = employees.find(emp => emp.id === parseInt(req.params.empId));
    //not existing, return 404
    if(!employee){
        res.status(400).send(`no employee found with id ${req.param.empId}`);
        return;
    }
    //delete
    const index = employees.indexOf(employee);
    employees.splice(index, 1);
    //reurn the same employee
    return employee;
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