const express = require('express');
const connectDB = require('./config/db')
const app = express();
const bodyParser = require("body-parser")

connectDB();//connect database
app.use(express.json({extended: false})); // allow us to get the data from request.body
app.get('/', (req,res) => res.send('API running'))

//make api/users/ will be = route/api/user 
app.use('/api/user', require('./route/api/user'));
app.use('/api/profile', require('./route/api/profile'));
app.use('/api/post', require('./route/api/post'));
app.use('/api/auth', require('./route/api/auth'));
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
