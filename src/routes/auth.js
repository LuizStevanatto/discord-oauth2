const  router  = require('express').Router();
const passport = require("passport")


router.get("/", (req, res) =>{
    res.send("Auth Main Route")
})

// Discord Auth Routes
router.get('/discord', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
    
    failureRedirect: '/error',
    successRedirect: '/dashboard'

}), (req, res) =>{
    res.send(req.user)
})

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get("/google/redirect", passport.authenticate('google', {

    failureRedirect: '/error',
    successRedirect: '/dashboard'
    
}), (req, res) => {
    res.send(req.user)
})


// Logout Route
router.get("/logout", (req, res) =>{
    if(req.user) {
        req.logout();
        res.redirect("/");
    }else{
        res.redirect("/");
    }
})


module.exports = router;
