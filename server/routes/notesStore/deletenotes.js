const deleteNotesRoute = require("express").Router()
const NotesModel = require("../../model/notesschema");
const fetchUser = require("../middleware/fetchuser");

deleteNotesRoute.delete("/deletenotes/:id", fetchUser, async (req, res) => {

    const notesDB = await NotesModel.findById(req.params.id);
    try {
        if (!notesDB) { return res.status(401).json({success:false,message:"Notes Not found"}) };
        if (notesDB.user.toString() !== req.user.id) { return res.status(401).json({success:false,message:`Not allowed`}) };

        await NotesModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success:true,message: "Notes deleted successfully"});

    } catch (error) {
        return res.status(500).json({ "err": "Internal server error" });
    }
});

module.exports = deleteNotesRoute;

