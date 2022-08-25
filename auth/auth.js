const jwt = require('jsonwebtoken');

const user = require('../models/userModel');

module.exports.verifyuser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const uData = jwt.verify(token, "anySecretKey");
        user.findOne({ _id: uData.userId })
            .then((userData) => {
                req.userInfo = userData;
                next();
            })
            .catch((e) => {
                res.json(e);
            })
    }
    catch (e) {
        res.json(e);

    }
}