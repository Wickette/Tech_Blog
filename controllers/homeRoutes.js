const router = require("express").Router();
const { Thread, Comment, User } = require("../models")
const withAuth = require("../utils/auth");

// use "/"

//Get ALL threads (universal)
router.get("/", async (req, res) => {
    try {
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

// Get all threads by user ID  (universal)
router.get("/:id", async (req, res) => {
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




module.exports = router;