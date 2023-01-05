let express = require("express");
const router = express.Router();
const userService = require("../services/userService.js");


//create
router.post("/register", (req, res, next) =>{
    userService.registerUser(req.body).then((data) =>{
        res.status(201).json(data);
    }).catch((err) =>{
        res.status(400).json(err)
    });
});

//login
router.post("/login", (req, res, next) =>{
    console.log(req.session.user);
    userService.loginUser(req.body).then((data) =>{
        // TODO : not sure if any good need to check again
        req.session.user = data;
        console.log(req.session.user);
        // END >>>>
        res.status(200).json(data);
    }).catch((err) => {
        res.status(404).json(err);
    });
});

// return all user in database by 10
router.get("/",(req,res,next)=>{
    userService.getAllUser().then((data) => {
        res.status(200).json(data);
    }).catch((err) =>{
        res.status(400).json(err);
    })
})

//get user towers
router.get("/:id/towers",(req,res,next)=>{
    userService.getUserTowers(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) =>{
        res.status(400).json(err);
    })
})
//get user credit
router.get("/:id/credit",(req,res,next)=>{
    userService.getUserCredit(req.params.id).then((data) => {
        res.status(200).json({credits : data});
    }).catch((err) =>{
        res.status(400).json(err);
    })
})
//post user credit
router.post("/:id/credit",(req,res,next)=>{
    userService.updateUserCredit(req.params.id, req.body).then((data) => { 
        res.status(200).json(data);
    }).catch((err) =>{
        res.status(400).json(err);
    })
})

//get user score
router.get("/:id/score",(req,res,next)=>{
    userService.getUserScore(req.params.id).then((data) => {
        res.status(200).json({score : data});
    }).catch((err) =>{
        res.status(400).json(err);
    })
})
//post user score
router.post("/:id/score",(req,res,next)=>{
    userService.updateUserScore(req.params.id, req.body).then((data) => {
        res.status(200).json(data);
    }).catch((err) =>{
        res.status(400).json(err);
    })
})

//post tower
router.post("/:id/tower/:towerId",(req,res,next)=>{
    userService.updateUserTower(req.params.id, req.params.towerId).then((data) => {
        res.status(200).json(data);
    }).catch((err) =>{
        res.status(400).json(err);
    })
})

// Get userByID 2022-08-01
router.get("/:userName",(req,res,next)=>{
    const userName = req.params.userName;
    userService.getUserByName(userName).then((data) => {
        res.status(200).json(data);
    }).catch((err) =>{
        res.status(404).json(err);
    })
})

module.exports = router;