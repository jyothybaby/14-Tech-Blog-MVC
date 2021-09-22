const withAuth = (req, res, next) => {
  // TODO: If the user is not logged in, redirect the user to the login page
  // TODO: If the user is logged in, allow them to view the paintings
  //This is directly from the `/gallery/:id` and `/painting/:id` routes
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = withAuth;
