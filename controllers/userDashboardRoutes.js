const router = require("express").Router();
const { Thread, User, Comment } = require("../models");
const withAuth = require("../utils/auth")

// Get threads related to Logged In user
router.get("/",  async (req, res) => {
    try {
        const threadData = await Thread.findAll({
            where: {user_id: req.session.user_id},
            include: [{model: User, attributes: ["username"]}, {model: Comment, attributes: ["description","date_created"], include: [{model: User, attributes: ["username"]}]}],
        });
        const threads = threadData.map((thread) => thread.get({ plain: true }));
        res.status(200).json(threads);
    } catch (error) {
        res.status(500).json(error)
    }
  });

  module.exports = router;