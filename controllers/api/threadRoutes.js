const router = require("express").Router();
const { Thread } = require("../../models");
const withAuth = require("../../utils/auth");
// use /api/thread

//create thread
router.post("/", async (req, res) => {
    req.body.user_id = req.session.user_id
    console.log(req.session.user_id)
    try {
        const newThread = await Thread.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,
        });
                res.status(200).json(newThread)
    } catch (error) {
        res.status(500).json(error)
    }
});
//update thread
router.put("/:id", async (req, res) => {
    try {
        const updateThread = await Thread.update({
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user_id,
        },
        {
            where: {id: req.params.id}
        });
        res.status(200).json(updateThread);
    } catch (error) {
        res.status(500).json(error);
    }
});

//delete thread
router.delete("/:id", async (req, res) => {
    try {
        const deleteThread = await Thread.destroy({
            where: {id: req.params.id}
        });
        if (!deleteThread) {
            res.status(404).json({messgage: "No thread with that id"});
            return
        }
        res.status(200).json(deleteThread)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;