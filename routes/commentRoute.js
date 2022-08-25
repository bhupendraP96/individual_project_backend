const comment = require('../models/commentModel');
const express = require('express');
const router = new express.Router();
const auth = require('../auth/auth');


//add new comment
router.post('/comment/add/:pid', auth.verifyuser, (req, res) => {

    const pid = req.params.pid;
    const uid = req.userInfo._id;
    const commenter = req.userInfo.fullName;
    const commentBody = req.body.commentBody;

    const commentData = new comment({
        photoId: pid,
        userId: uid,
        commenter: commenter,
        commentBody: commentBody
    })
    commentData.save()
        .then(result =>
            res.json(result))
        .catch(e =>
            res.json(e))
})

//view comments
router.get('/comment/view/:pid', (req, res) => {
    comment.find({ photoId: req.params.pid })
        .then(result => {
            res.json(result);
        })
        .catch(e =>
            res.json(e))
})

//edit comment
router.put('/comment/edit/:id', auth.verifyuser, (req, res) => {
    const commentBody = req.body.commentBody;
    comment.updateOne({ _id: req.params.id, userId: req.userInfo._id }, {
        commentBody: commentBody
    })
        .then(() =>
            res.json({ message: "comment updated" }))
        .catch(e =>
            res.json(e))
})

//delete comments
router.delete('/comment/delete/:id', auth.verifyuser, (req, res) => {
    comment.deleteOne({ _id: req.params.id, userId: req.userInfo._id })
        .then(() => {
            res.json({ message: "Comment deleted!" })
        }).catch(e =>
            res.json(e))
})



module.exports = router;