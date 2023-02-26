const router = require("express").Router();

// Home page ...
router.get("/",(req,res)=>{
    return res.send("Hello iNotes");
});

// Import signup API ...
const signup = require("./signup");
router.use(signup);

// Import login API ...
router.use(require("./login"))

// Import getuser API ...
router.use(require("./getuser"));

// Import Notes API ...
router.use(require("./notesStore/notes"));

// Import Add Notes API ...
router.use(require("./notesStore/addnotes"));

// Import Update Notes API ... 
router.use(require("./notesStore/updatenotes"))

// Import Delete Notes API ...
router.use(require("./notesStore/deletenotes"));

module.exports = router;


