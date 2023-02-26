const jwt = require("jsonwebtoken");

//  Secret key ...
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {

    // Extract token from header ...
    const token = req.header("userToken");

    if (!token) {
        return res.status(401).send({ err: "User Token empty" });
    }
    // Now verify the jwt token token ... // after verifying send user to req for further process ...
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.user;
        // console.log(req.user);
    } catch (error) {
        return res.status(401).send({err:"Internal server error in token"});
    }

    next();
}


module.exports = fetchuser;
