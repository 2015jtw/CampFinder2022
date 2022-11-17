
// middleware function for checking if user is logged in before performing task
module.exports.isLoggedIn = (req, res, next) => {
    console.log('req.user....', req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in.');
        return res.redirect('/login');
    }
    next();
}