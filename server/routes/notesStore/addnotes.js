const addNoteRoute = require("express").Router();
const notesModel = require("../../model/notesschema");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

// Created a route to add Notes in DB ...

addNoteRoute.post("/addnotes", [
    body("title", "Title must be three character").isLength({ min: 1 }),
    body("description", "Des must be 5 character").isLength({ min: 1 })
], fetchUser, async (req, res) => {

    const errors = await validationResult(req);
    if (!errors.isEmpty())
        return res.status(500).json({ err: errors });

    try {
        const { title, description, tag } = req.body;
        const saveNotes = new notesModel({
            title: title, description, tag, user: req.user.id,
        });
        const saveData = await saveNotes.save();
        return res.status(200).json({success:true, saveData});

    } catch (error) {
        res.status(500).json({ err: "Internal server error" });
    }
});

module.exports = addNoteRoute;


