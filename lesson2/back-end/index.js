const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

let tickets = [];
let id = 0;

app.get('/api/ticket', (req, res) =>{
    console.log("IN GET");
    res.send(tickets);
})

app.post('/api/ticket', (req, res) => {
    id += 1;
    let obj = {
        id: id,
        name: req.body.name,
        problem: req.body.problem
    }
    tickets.push(obj);
    res.send(obj);
})

app.delete('/api/ticket', (req, res) => {
    let found = false;
    for (let num=0;num<tickets.length;num++){
        if (req.body.name === tickets[num].name){
            tickets.splice(num, 1);
            found = true;
            break;
        }
    }
    if (!found) {
        res.status(400).send("Sorry, that doesn't exist");
        return;
    }
    
    res.sendStatus(200);
})

app.listen(3000, () => {console.log("Listening on port 3000")});
