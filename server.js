const express = require('express')
const app = express()
// const dotenv = require("dotenv");
const cors = require('cors');
// const path = require("path");


//adding middleware for json request
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const corsOptions = {
  origin: 'https://newcontactapp.rahulpal5.repl.co', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials like cookies
  optionsSuccessStatus: 204, // Return a 204 status code for preflight requests
};

// Enable CORS with the configured options
app.use(cors(corsOptions));

require('dotenv').config();
const PORT = process.env.PORT;
// const port = 3000
const path = require('path');
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


const route = require("./routes/contact")
app.use("/api/v1", route);


// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

const dbconnect = require("./config/dbconnect");
dbconnect();

const cloudinaryconnect = require("./config/cloudinary")
cloudinaryconnect();

// const fileuplaod = require("./routes/fileupload");
// app.use("/ap/v1", fileuplaod);

app.listen(PORT, () => {
  // Code.....
  console.log(`app is running in successfully  ${PORT}`)
})