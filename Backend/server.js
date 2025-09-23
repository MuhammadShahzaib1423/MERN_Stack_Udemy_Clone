const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app =express();
const connectionDb = require('./config/connectiondb.js');


 


connectionDb();
app.use(express.json());


app.use(cors());

app.get('/',(req,res)=>{
    res.send("API is running....");
});
app.use('/user',require('./routes/userroutes'));

const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

 
