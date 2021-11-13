const router = require("express").Router();
const { Thread, Comment, User } = require("../models")
const withAuth = require("../utils/auth");

//Get ALL threads (universal)
router.get("/", async (req, res) => {
    try {
      const threadData = await Thread.findAll({
        include: [{model: User, attributes: ["username"]}],
      });
      const threads = threadData.map((thread) => thread.get({ plain: true }));
      res.render("homepage", {
        threads,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get all threads by user ID  (universal)
router.get("/thread/:id", async (req, res) => {
    try {
        const editThread = await Thread.findByPk(req.params.id, {
            include: [{model: User, attributes: ["username"]}, {model: Comment, include: [{model: User, attributes: ["username"]}]}],
        });
        const threads = editThread.get({ plain: true });
          res.render("threads", {
          ...threads,
          logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

// Get threads related to Logged In user
router.get("/dashboard", withAuth, async (req, res) => { 
  try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Thread }]
      });
      const user = userData.get({ plain: true });
      res.render("dashboard", {
        ...user,
        logged_in: true
      })
  } catch (error) {
      res.status(500).json(error)
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/")
    return
  }
    res.render("login")
});

router.get("/newThread", withAuth, (req, res) => {
  res.render("newThread", {
    logged_in: true
  })
})

router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
  try {
    const threadData = await Thread.findOne({
      where: {id: req.params.id},
      include: [{model:User, attributes: ["username"]}]
    })
    const threads = threadData.get({plain:true});
    if (threads.user_id === req.session.user_id) {
      res.render("edit", {
        ...threads,
        logged_in: req.session.logged_in
      });
    } else {
      res.render("login")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get("/logout", (req, res) => {
  res.redirect("/")
})

module.exports = router;