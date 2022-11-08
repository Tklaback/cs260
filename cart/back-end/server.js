const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());


let products = [];
let uniqueId = 0;

let cartItems = [];

app.get('/api/cart', (req, res) => {
    console.log("GET CART!");
    res.status(200).send(cartItems);
})

app.get('/api/cart/:id', (req, res) => {
    console.log("GET CART ID!");
    let found = cartItems.find((el) => el.id == req.params.id);
    res.status(200).send(found);
})

app.post('/api/cart/:id', (req, res) => {
    let ids = cartItems.map((el) => {
        return el.id;
    })
    let pos = ids.indexOf(parseInt(req.params.id));
    if (pos === -1){
        let object = {
            id: parseInt(req.params.id),
            quantity: 1
        };
        cartItems.push(object);
        res.status(200).send(object);
    }
    else{
        cartItems[pos].quantity++;
        res.status(200).send(cartItems[pos]);
    }
    console.log("CART ITEM POSTED!", cartItems);
});

app.put('/api/cart/:id/:quantity', (req, res) => {
    let ids = cartItems.map((el) => {
        return el.id;
    })
    let pos = ids.indexOf(parseInt(req.params.id));
    console.log(ids);
    if (pos === -1){
        res.status(404).send("ERROR in put");
    }
    else if (req.params.quantity == 0){
        cartItems[pos].quantity = 0;
        let temp = cartItems[pos];
        cartItems.splice(pos, 1);
        res.status(200).send(temp);
    }
    else{
        cartItems[pos].quantity = parseInt(req.params.quantity);
        res.status(200).send(cartItems[pos]);
    }
})

app.delete('/api/cart/:id', (req, res) => {
    let found = cartItems.find((el) => el.id == parseInt(req.params.id))
    console.log(found);
    cartItems = cartItems.filter(obj => obj.id != parseInt(req.params.id))
    res.status(200).send(cartItems);
})

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
    let object = {
        id: uniqueId,
        name: req.body.name,
        price: req.body.price
    };
    products.push(object);
    uniqueId++;
    res.status(200).send(object);
});

app.delete('/api/products/:id', (req, res) => {
    console.log("DELETE!");
    products = products.filter(obj => obj.id != req.params.id)
    res.status(200).send(products);
})

app.listen(3000, () => {console.log("LISTENING ON PORT 3000")});