const router = require('express').Router();
const { Thread, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Use for all GET routes

router.get("/", async (req, res) => {
    try {
        const threadData = await Thread.findAll({
            include: [
                {model: User, attributes: ["name"]},
            ],
        });
        const threads = threadData.map((thread) => thread.get({ plain: true }));
        console.log(threads)
        res.status(200).json(threads);
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router