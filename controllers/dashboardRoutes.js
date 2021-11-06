const router = require("express").Router();
const Thread = require("../models/Thread");


//Get thread associated with user ID
router.get("/", async (req, res) => {
    try {
        const threadData = await Thread.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    attributes: ["description","date_created"],
                    include: [
                        {
                            model: User, 
                            attributes: ["username"]
                        }
                    ]
                },
            ],
        });
        const threads = threadData.get({ plain: true });
        res.status(200).json(threads)
    } catch (error) {
        res.status(500).json(error)
    }
});