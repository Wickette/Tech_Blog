const router = require("express").Router();
const { Thread, Comment, User } = require("../models")
const withAuth = require("../utils/auth");

// Use for all GET routes
router.get("/", async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const threadData = await Thread.findAll({
        include: [
          {
            model: User,
            attributes: ["username"]
          },
        ],
      });
      const threads = threadData.map((thread) => thread.get({ plain: true }));
      res.status(200).json(threads);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/thread/:id", async (req, res) => {
    try {
        const threadData = await Thread.findByPk(req.params.id, {
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

//LOGIN

//SIGNUP

module.exports = router;