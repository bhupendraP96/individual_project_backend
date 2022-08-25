const express = require('express');
const router = new express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const auth = require('../auth/auth');
const upload = require('../images/photos');

const user = require('../models/userModel');

//registration route for new user
router.post('/user/register', (req, res) => {
    const username = req.body.username;
    user.findOne({ username: username })
        .then(function (userData) {
            
            if (userData != null) {
                return res.json({ message: "User Already Taken, please try another" });
            }
            const password = req.body.password;
            const fullName = req.body.fullName;
            const eMail = req.body.eMail;
            const phoneNo = req.body.phoneNo;
    //        const rePassword = req.body.rePassword

            //validation
            // const usernameValid = validator.matches(username, '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){5,20}$')
            // const fullNameValid = validator.matches(fullName, "^[a-zA-Z ]{3,20}$")
            // const eMailValid = validator.isEmail(eMail);
            // const passwordValid = validator.matches(password, "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){5,20}$")
            // const rePasswordValid = password === rePassword;

            // if (!(usernameValid && fullNameValid && eMailValid && passwordValid && rePasswordValid)) {
            //     return res.json({ message: "Please check and enter valid details" });
                
            // }

            user.findOne({ eMail: eMail })
                .then((userData) => {
                    if (userData != null) {
                        return res.json({ message: "User already exists under this email" });

                    }

                    bcryptjs.hash(password, 10, (e, hashed_value) => {
                        const data = new user({
                            username: username,
                            password: hashed_value,
                            fullName: fullName,
                            eMail: eMail,
                            phoneNo: phoneNo,
                        })
                        data.save()
                            .then(() => {
                                res.json({ success: true, pass: "User registered successfully" });
                            })
                            .catch((e) => {
                                res.json(e)
                            })
                    })
                });
        })
});


// login route for user
router.post('/user/login', (req, res) => {
    const username = req.body.username;
    user.findOne({ username: username })
        .then((userData) => {
            if (userData === null) {
                return res.json({ message: "Invalid username or password" })
            }
            //comparing password
            bcryptjs.compare(req.body.password, userData.password, (e, result) => {

                if (!result) {
                    return res.json({ message: "Invalid username or password" })
                }

                const token = jwt.sign({ userId: userData._id }, "anySecretKey");
                res.json({ token: token, pass: "Successfully logged in", uId: userData._id, success: true })
            })

        })
        .catch((e) => {
            console.log(e);
        })
});


//view user profile
router.get('/user/profile', auth.verifyuser, (req, res) => {
    user.findById(req.userInfo._id)
        .then((result) => {
            res.json(result)
        })
});
//view user profile by other user
router.get('/user/profile/:id', (req, res) => {
    user.findById(req.params.id)
        .then((result) => {
            res.json(result)
        })
});


//profile update of user
router.put('/user/profile/update', upload.single("myimage"), auth.verifyuser, (req, res) => {
    const uId = req.userInfo._id
    const password = req.body.password
    if(req.file){
        bcryptjs.hash(password, 10, (e, hashed_value) => {
        user.updateOne({ _id: uId }, {
            password: hashed_value,
            fullName: req.body.fullName,
            eMail: req.body.eMail,
            phoneNo: req.body.phoneNo,
            userImage: req.file.filename })
            .then(() => {res.json({ pass: "Your profile has been updated!" })})
            .catch((e) => {res.json(e)});
    })
    }else{
        bcryptjs.hash(password, 10, (e, hashed_value) => {
        user.updateOne({ _id: uId }, {
            password: hashed_value,
            fullName: req.body.fullName,
            eMail: req.body.eMail,
            phoneNo: req.body.phoneNo })
            .then(() => {
                res.json({ pass: "Your profile has been updated!" })})
            .catch((e) => {res.json(e)});
        })
    }
});



//delete user account
router.delete('/user/profile/delete', auth.verifyuser, (req, res) => {
    user.findByIdAndDelete(req.userInfo._id)
        .then(() => {
            res.json({ message: "user Deleted" })
        })
        .catch((e) => {
            res.json(e)
        })
});



// for following/unfollowing user
router.put('/user/follow/:id/:myid', (req, res) => {
    const uId = req.params.id
    const myid = req.params.myid

    user.findById(req.params.id)
        .then((otherUser) => {
            if (!otherUser.followers.includes(myid)) {
                Promise.all([
                    user.updateOne({ _id: myid }, { $push: { following: uId } }),
                    user.updateOne({ _id: uId }, { $push: { followers: myid } })
                ]).then(() => {
                    res.json({ message: "following user" });
                })
                    .catch((e) => {
                        res.json(e);
                    });
            } else {
                Promise.all([
                    user.updateOne({ _id: myid }, { $pull: { following: uId } }),
                    user.updateOne({ _id: uId }, { $pull: { followers: myid } })
                ]).then(() => {
                    res.json({ message: "Unfollowed user" });
                })
                    .catch((e) => {
                        res.json(e);
                    });
            }
        })
});

module.exports = router;

