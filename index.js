const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('employeeDatabase', ['employees']);
const app = express();
const http = require('http');

app.use(express.static(__dirname + "/lib"));
app.use(bodyParser.json());

app.get('/api/employees', (req, res) => {
   db.employees.find(function(error, docs){
       res.json(docs);
   });
});

app.get('/api/employees/:empId', (req, res) => {
    const id = req.params.empId; 
    db.employees.findOne({_id: mongojs.ObjectId(id)}, function(error, docs){
        res.json(docs);
    });
});

app.get('/api/address/:index', (req, response)=>{
    const index = req.params.index;
    http.get('http://jsonplaceholder.typicode.com/users/'+index, function(res){
        var addressRes = "";
        res.on('data', function(data) {
            console.log('data came');
            addressRes += data;
        });
        res.on('end', function() {
            var result = JSON.parse(addressRes);
            console.log(result.address);
            var address =  result.address.suite + ", "+ result.address.street + ", " + result.address.city + ", "+result.address.zipcode;
            response.send(address);
        }); 
    });
});

//Post API for adding name and id 
app.post('/api/addEmployee', (req, res) => {
    db.employees.insert(req.body, function(err, docs){
        res.json(docs);
    });
});

//update existing employee name by using id
app.put('/api/employees/:empId', (req, res) => {
    const id = req.params.empId; 
    db.employees.findAndModify({query:{_id: mongojs.ObjectId(id)},
    update:{$set:{emp_name:req.body.emp_name, emp_id: req.body.emp_id, designation:req.body.designation}},
    new:true},
    function(error, docs){
        res.json(docs);
    });
});

//delete employee by employee id
app.delete('/api/removeEmployee/:id', (req, res) => {
    const id= req.params.id;
    db.employees.remove({_id:mongojs.ObjectId(id)}, function(err, docs){
        res.json(docs);
    });
});

//for dynamic port
const PORT = process.env.PORT || 3000;

app.listen('3000', () => {
    console.log(`Listening on port ${PORT}`);
})