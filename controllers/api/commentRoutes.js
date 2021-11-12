const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth")
// use /api/comment

router.get("/", async (req, res) => {
    const getComment = await Comment.findAll()
    res.json(getComment)
})

//create comment
router.post("/", withAuth, async (req, res) => {
    if (!req.session) {
        res.status(404).send("Sorry, you must be logged in")
    } else {
        try {
            console.log(req.body)
            const newComment = await Comment.create({
                description: req.body.description,
                thread_id: req.body.thread_id,
                user_id: req.session.user_id
            });
            res.status(200).json(newComment);
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

module.exports = router;