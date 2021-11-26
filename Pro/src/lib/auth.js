//Verifica si el usuario esta dentro de para asi poder ver algunas vistas 
module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    }
};
