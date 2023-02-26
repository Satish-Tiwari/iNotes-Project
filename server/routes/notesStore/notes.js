const notesRoute = require("express").Router();
const NotesModel = require("../../model/notesschema");
const fetchUser = require("../middleware/fetchuser");

notesRoute.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const totalNotes = await NotesModel.find({ user: req.user.id }).countDocuments();
        const userNotes = await NotesModel.find({ user: req.user.id }).sort({_id:-1});
        return res.status(200).json({success:true,totalNotes,userNotes});
    } catch (error) {
        return res.status(500).json({ err: "Internal server error" })
    }
});


module.exports = notesRoute;


