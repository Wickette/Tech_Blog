const router = require("express").Router();
const { Comment, Thread, User } = require("../../models");
// use /api/comment

router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["username"]}, { model: Thread, attributes: ["title"] }],
        });
        res.status(200).json(commentData)
    } catch (error) {
        res.status(500).json(error);
    }
})

//create comment
router.post("/:id", async (req, res) => {
    console.log(req.body)
    try {
        const newComment = await Comment.create({
            description: req.body.description,
            thread_id: req.body.thread_id,
            user_id: req.session.user_id
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error)
    }
})
//update comment
router.put("/:id", async (req, res) => {
    try {
        const updateComment = await Comment.update({
            description: req.body.description,
            user_id: req.body.user_id,
        },
        {
            where: {id: req.params.id}
        });
        res.status(200).json(updateComment);
    } catch (error) {
        res.status(500).json(error);
    }
})
//delete comment
router.delete("/:id", async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {id: req.params.id}
        });
        if (!deleteThread) {
            res.status(404).json({messgage: "No thread with that id"});
            return
        }
        res.status(200).json(deleteComment)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;