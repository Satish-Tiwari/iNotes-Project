const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tag: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;

