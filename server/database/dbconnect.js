const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect(process.env.DB_URL,{dbName:"iNotes"}).then(() => {
        console.log("Database Connected ...");
    }).catch((err) => {
        console.log(err);
    });
}
module.exports = dbconnect;

