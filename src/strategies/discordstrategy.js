const DiscordStrategy = require("passport-discord");
const passport = require("passport")
const DiscordUser = require("../models/DiscordUser")

passport.serializeUser((user, done) =>{
    // console.log("Seriallizing")
    done(null, user.id)
})

passport.deserializeUser(async(id, done) =>{
    const user = await DiscordUser.findById(id)
    if(user){
        // console.log("Deseriallizing")

        done(null, user)
    }
})


passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID_DISCORD,
    clientSecret: process.env.CLIENT_SECRET_DISCORD,
    callbackURL: process.env.CLIENT_REDIRECT_DISCORD,
    scope: ['identify', 'guilds', 'email']
}, async (accessToken, refreshToken, profile, done) =>{
    try {

        const user = await DiscordUser.findOne({ discordID: profile.id});
        if(user){
            // console.log("User already exists");
            // // console.log(profile.id);
            // console.log(profile.email);
            done(null, user);
        }else{

            const newUser = await DiscordUser.create({
                discordID: profile.id,
                email: profile.email,
                username: profile.username,
                guilds: profile.guilds
            });
            

            const savedUser = await newUser.save()
            // console.log("New user created")
            // console.log(profile.id);
            done(null, savedUser);

        }

    } catch (err) {

        console.log(err)
        done(err, null)

    }

}));