const getUserRouter = require("express").Router();
const userModel = require("../model/userschema");

// Middleware for authenticate user ...
const fetchuser = require("./middleware/fetchuser");

getUserRouter.post("/getuser", fetchuser, async (req, res) => {

    // here we get extrected user data from req via using middleware by that we get the id of user ...
    // after that we get the user details expect user password ...
    try {
        const userID = req.user.id;
        const userFind = await userModel.findById(userID).select("-password");
        return res.send({userFind});
    } catch (error) {
        return res.status(401).send({ err: "Try with valid token" })
    }

});

module.exports = getUserRouter;


