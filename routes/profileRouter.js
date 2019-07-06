const router = require("express").Router();


const authCheck = (req,res,next)=>{
    if(!req.user){
        //if user is not looged in sent to login page
        res.redirect("auth/login");
    }else{
        next();
    }
}

router.get("/", authCheck, (req,res) =>{
   // res.send("Welcome "+ req.user.username);
   res.render("profile", {user:req.user});
})

module.exports = router;