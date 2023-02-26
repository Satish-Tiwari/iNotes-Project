require("dotenv").config();
// const express = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000

// Require body-parser ...
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


const cors = require('cors')
app.use(cors())

// Connect databse ...
const dbconnect = require("./database/dbconnect");
dbconnect();

// Calling router file ...
app.use(require("./routes/router"));

// Server listen here ...
app.listen(PORT,()=>{
    console.log(`server run at http://localhost:${PORT}`);
});

