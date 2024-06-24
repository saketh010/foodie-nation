const express = require('express')
const app = express(); 
const cors=require('cors');
const port = process.env.PORT||6001;
const mongoose = require('mongoose');
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());



//mongodb config
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodie-nation-client.qret23b.mongodb.net/foodie-nation-client?retryWrites=true&w=majority&appName=foodie-nation-client`)
.then(console.log("MongoDB connected succesfully")).catch((error)=>console.log("error connecting to MongoDB",error));


const menuRoutes=require('./api/routes/menuRoutes');
const cartRoutes=require('./api/routes/cartRoutes')
app.use('/menu',menuRoutes)
app.use('/carts',cartRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})