const passport = require("passport");
const GoogleStrategy =require("passport-google-oauth20");
const FacebookStrategy =require("passport-facebook");
const keys = require("../config/keys"); 
const User = require("../model/user-model");


//function to get a piece of our data and sent to cookies 
passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) =>{
    done(null, user);
  });
});

//passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.googleClientID,
      clientSecret: keys.google.googleClientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    /*
  new FacebookStrategy({
    clientID:keys.facebook.facebookClientID,
    clientSecret:keys.facebook.facebookClientSecret,
    callbackURL:"http://localhost:5000/auth/facebook/callback"
  },*/
    (accessToken, refreshToken, profile, done) => {
      //startegy call back function
      console.log("accesstoken",accessToken);
      console.log("refreshToken",refreshToken);
      console.log("profile",profile);

      console.log("Logout");
      //Check if user is already in Db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {

      // if already have the user
          console.log("user is:", currentUser);
          done(null, currentUser);
        } else {

      //if not , create user in db
          new User({
            googleId: profile.id,
            username: profile.displayName,
            email:profile.emails,
            thumbnail:profile._json.picture
          })
            .save()
            .then(newUser => {
              console.log("New User Created:" + newUser);
              done(null, newUser);
            });
        }
      });



      //facebbook
     
    }
  
));