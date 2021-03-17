const router = require('express').Router();

function isAuthorized(req, res, next){
    if(req.user){
        // console.log("User is logged in");
        // console.log(req.user)
        next();
    }else{
        // console.log("User is not logged in");
        res.redirect("/auth/discord")
    }
};



router.get("/",   isAuthorized,   (req, res) =>{
    res.render("dashboard", {
        username: req.user.username,
        discordID: req.user.discordID,
        guilds: req.user.guilds
    })
});

router.get("/settings", isAuthorized, (req, res) =>{
    res.send("Dashboard Settings")
});

module.exports = router;