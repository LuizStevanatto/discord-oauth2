require('dotenv').config();
const express = require('express');
const PORT  = process.env.PORT ||  8080;
const app = express();
const session = require("express-session");
const mongoStore = require('connect-mongo')(session)
const passport = require("passport");
const DiscordStrategy = require("./strategies/discordstrategy");
const db = require("./database/db");
const path = require("path");
const mongoose = require('mongoose')

db.then(() =>{
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Err:", err)
});


// Routes Import
const authRoute = require("./routes/auth")
const dashboardRoute = require("./routes/dashboard")


app.use(session({
    secret: "oauth2-discord",
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.oauth2',
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}));

// Engine EJS

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "public"    )))


// Passport
app.use(passport.initialize());
app.use(passport.session());


// Home Page Route
app.get("/", isAuthorized, (req, res) =>{
    res.render("home.ejs")
});

app.get("/login", (req, res) =>{
    res.redirect("/auth/")
})

// Middleware Routes
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

function isAuthorized(req, res, next){
    if(req.user){
        console.log("User is logged in");
        res.redirect("/dashboard")
    }else{
        console.log("User is not logged in");
        next();
    }
};

app.listen(PORT, () =>{
    console.log(`Server is running!! on PORT ${PORT}`)
});