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
app.get('/api/products/:id', (req, res) => {
    let found = products.find((el) => el.name === req.body.name);
    if (found){
        res.status(200).send("SUCCESS!");
    }
    res.status(404).send("ERROR, ID not in products");
})

app.post('/api/products', (req, res) => {
    console.log("HERE!");
    let names = products.map((el) => {
        return el.name;
    })
    let pos = names.indexOf(req.body.name);
    if (pos === -1){
        let object = {
            id: uniqueId,
            name: req.body.name,
            price: req.body.price
        };
        products.push(object);
        uniqueId++;
    }
    res.send(products);
});

app.listen(3000, () => {console.log("LISTENING ON PORT 3000")});