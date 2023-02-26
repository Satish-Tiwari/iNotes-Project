const updateNotesRoute = require("express").Router();
const fetchUser = require("../middleware/fetchuser");
const NotesModel = require("../../model/notesschema");

updateNotesRoute.put("/updatenotes/:id", fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        // Enter in Notes DB ...
        const notesDB = await NotesModel.findById(req.params.id);
        if (!notesDB) { return res.status(404).json({success:false,message:"Not found"}) };
        // Find user from Notes DB and compare it with valid user which comes from fetchuser ...
        if (notesDB.user.toString() !== req.user.id) { return res.status(401).json({success:false,message:"Not Allowed" })};
        // Now update the data in DB ...
        await NotesModel.findByIdAndUpdate(req.params.id,{
            title,
            description,
            tag
        });
        const updatedNote = await NotesModel.findById(req.params.id);
        return res.status(200).json({success:true,updatedNote});

    } catch (error) {
        res.status(500).json({ err: "Internal server error" })
    }

});

module.exports = updateNotesRoute;

