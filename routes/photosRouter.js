const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth');
const upload = require('../images/photos');
const photo = require('../models/photosModel');


//add new post
router.post('/photos/upload', auth.verifyuser, upload.single("addimage"), (req, res) => {

    const userId = req.userInfo._id;
    const owner = req.userInfo.fullName;
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const category = req.body.category;
    const imageName = req.file.filename;


    if (req.file === undefined) {
        return res.json({ message: "Invalid Image" });
    }
    var nowDate = new Date();
    var pdate = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();

    const data = new photo({
        userId: userId,
        owner: owner,
        title: title,
        description: description,
        location: location,
        category: category,
        imageName: imageName,
        uploaded: pdate

    })
    data.save()
        .then(() => {
            res.json({ message: "Photo added", success: true });
        })
        .catch(() => {
            res.json({ message: "something went wrong" });
        });
})

//to update the photos

router.put("/photos/update", auth.verifyuser, (req, res) => {

    const pId = req.body.pid;
    const uId = req.userInfo._id;
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const category = req.body.category;


    photo.findOneAndUpdate({ _id: pId, userId: uId }, {
        title: title,
        description: description,
        location: location,
        category: category,
    })
        .then(() => {
            res.json({ message: "Image information updated" });
        })
        .catch((e) => {
            res.json(e);
        });
});



//to delete photos
router.delete('/photos/delete/:id', auth.verifyuser, (req, res) => {
    const photoId = req.params.id;
    const userId = req.userInfo._id;
    photo.deleteOne({ _id: photoId, userId: userId })
        .then(() => {
            res.json({ message: "photo deleted" });
        })
        .catch(() => {
            res.json({ message: "something went wrong" });
        })


});

//view all photos
router.get('/photos/view', (req, res) => {
    photo.find()
        .then((result) => {
            res.json({ result, success: true });
        })
        .catch(() => {
            res.json({ message: "something went wrong" });
        })
});


//to view private photos
router.get('/photos/myphotos/:uid', (req, res) => {
    const userId = req.params.uid;
    photo.find({ userId: userId })
        .then((result) => {
            res.json({ result, success: true });
        })
        .catch(() => {
            res.json({ message: "something went wrong" });
        })
});


// open image or post
router.get('/viewimage/:id', (req, res) => {
    const pid = req.params.id;
    photo.findOne({ _id: pid })
        .then(result => 
            res.json(result))
        .catch(e => res.json(e))
});


// like/dislike photos
router.put('/photos/like/:id/:currentId', (req, res) => {

    const uId = req.params.currentId
    const pId = req.params.id;
    photo.findById(pId)
        .then((photoData) => {
            if (!photoData.likes.includes(uId)) {
                photoData.updateOne({ $push: { likes: uId } })
                    .then((result) => {
                        res.status(200).json({ message: "Photo Liked" });
                    }).catch((e) => {
                        res.json(e)
                    })
            } else {
                photoData.updateOne({ $pull: { likes: uId } })
                    .then(() => {
                        res.status(201).json({ message: "Photo Disliked"  });
                    }).catch((e) => {
                        res.json(e)
                    })
            }
        }).catch((e) => {
            res.json(e);
        })
})

//add post for android
router.post('/android/photos/upload', auth.verifyuser, (req, res) => {

    const userId = req.userInfo._id;
    const owner = req.userInfo.fullName;
    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const category = req.body.category;

    
    var nowDate = new Date();
    var pdate = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();
    const data = new photo({
        userId: userId,
        owner: owner,
        title: title,
        description: description,
        location: location,
        category: category,
        uploaded: pdate

    })
    data.save()
        .then((result) => {
            res.json({ message: "Photo added", result, success: true });
        })
        .catch(() => {
            res.json({ message: "something went wrong" });
        });
})

//to update the photos for android

router.put("/android/photos/update/:id", upload.single("addimage"), auth.verifyuser, (req, res) => {

    const pId = req.params.id;
    const uId = req.userInfo._id;

        photo.findOneAndUpdate({ _id: pId, userId: uId}, {
        imageName: req.file.filename
        
    })
        .then(() => {
            res.json({ message: "Image information updated android" });
        })
        .catch((e) => {
            res.json(e);
        });
});


module.exports = router;