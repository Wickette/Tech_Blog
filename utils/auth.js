const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/api/profile/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  