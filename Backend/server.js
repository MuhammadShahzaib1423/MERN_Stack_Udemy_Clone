const express = require('express');
const app =express();
const dotenv = require('dotenv').config();
const connectionDb = require('./config/connectionDb');
const cors = require('cors');

 

const PORT =process.env.PORT || 3000;
connectionDb();
app.use(express.json());

app.use(cors());
// app.use('/api/course',require('./routes/course'));
app.get('/',(req,res)=>{
    res.send("API is running....");
});
app.use('/user',require('./routes/userroutes'));
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app;

 
