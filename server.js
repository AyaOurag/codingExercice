const mysql = require('mysql');
let express = require('express');
let bodyParser= require('body-parser');
var port = process.env.PORT || 8080;

let app = express();

//import of different Routes
const {getProduct,getProductByID,addProduct} = require('./routes/productRoutes');
const {getCategory,addCategory} = require('./routes/categoryRoutes');
const {getOrders, getOrderByID} = require('./routes/orderRoutes');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// connection to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

//product Routes
app.get('/product', getProduct);
app.get('/product/:id', getProductByID)
app.post('/product', addProduct);

//category Routes
app.get('/category', getCategory);
app.post('/category', addCategory);

//order Routes
app.get('/order', getOrders);
app.get('/order/:id', getOrderByID)

app.listen(port, ()=>{
    console.log("Running on port: " + port);
});

