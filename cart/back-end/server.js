const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());


let products = [];
let qty = 0;
let uniqueId = 0;
app.get('/api/products', (req, res) => {
    console.log("GET!");
    res.status(200).send(products);
})

app.get('/api/products/:id', (req, res) => {
    console.log("GETID!");
    let found = products.find((el) => el.id == req.params.id);
        res.status(200).send(found);
})

app.post('/api/products', (req, res) => {
    console.log("POST!");
    // let names = products.map((el) => {
    //     return el.name;
    // })
    // let pos = names.indexOf(req.body.name);
    // if (pos === -1){
    let object = {
        id: uniqueId,
        name: req.body.name,
        price: req.body.price
    };
    products.push(object);
    uniqueId++;
    // }
    res.status(200).send(object);
});

app.delete('/api/products/:id', (req, res) => {
    console.log("DELETE!");
    products = products.filter(obj => obj.id != req.params.id)
    res.status(200).send(products);
})

app.listen(3000, () => {console.log("LISTENING ON PORT 3000")});