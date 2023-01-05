const express = require("express");
const cors = require("cors")
const app = express();
const userController = require("./controllers/userController.js");

if (process.env.NODE_ENV != "production") require(`dotenv`).config({ path: 'config/keys.env' });
const Mongoose = require("mongoose");
const HTTP_PORT = process.env.PORT || 8080;
// Sessions
const MongoStore = require('connect-mongo');
const session = require('express-session');
const { json } = require("express");
// Database
const userService = require("./services/userService");
// --------------------------------------- Middle Ware--------------------------------------

app.use(express.json())
// Sessions
app.use(cors({
    origin : "http://localhost:3000",
    credentials: true
}
));
app.use(session({
    secret:"test",
    resave:false,
    saveUninitialized:false,
    cookie : {
        expires: 1000*60*60*1
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_CONNECTION_LINE,
      })
}))
app.options('*', cors());

// ----------------------------------- Routes ------------------------------------------

app.use("/users", userController)

// Expects a cookie to be in the request, if it exist will send it back to the user
app.get("/login",async (req,res)=>{
    // CHECK
    if(req.session.user){

        // DEFINE
        const userName = req.session.user.username;

        // console.log("/login : "+ JSON.stringify(userName)) // DEBUG

        // HANDLE
        try {
            const currUser = await userService.getUserByName(userName) // GET
            res.status(201).send({loggedIn:true,user : currUser}) // SEND
        }
        catch(err){
            res.status(404).send({loggedIn:false, msg:err}) // SEND
        }        
    }
    else {
        res.status(404).send({loggedIn:false, msg:"Not logged in"}) // SEND
    }
})

app.get("/logout",(req,res)=>{
    // CHECK
    if(req.session.user){
        req.session.destroy(); // UPDATE
        res.status(200).send({"status": "ok"}) // SEND
    }
    else {
        res.status(404).send({"msg": "Not logged in"}) // SEND
    }
})

app.use((req, res) => {
    res.status(404).send("ERROR 404. PAGE IS NOT FOUND");
});

app.listen(HTTP_PORT, () => {
    console.log(`API is up and running on PORT ${HTTP_PORT}`);
    Mongoose.connect(process.env.MONGO_DB_CONNECTION_LINE)
        .then(() => {
            console.log(`Connected to MongoDB`);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        });
})

