const express=require("express")
const recruiterModel=require("../../schema/recruiterSchema")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {generatePasswordHash}=require("../../utility")
const router=express.Router()
router.post("/register",(req, res) => {
        generatePasswordHash(req.body.password).then((passwordHash) => {
            recruiterModel.create({
                name: req.body.name,
                email: req.body.email,
                password: passwordHash,
                phone: req.body.phone,
                bio:req.body.bio
            }).then(() => {
                    res.status(200).send(`${req.body.email} added successfully`);
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send(err.message)
                })
        });

});
router.post("/login", (req, res)=> {
    recruiterModel.find({email: req.body.user}).then((userData)=> {
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val) {
                    const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
           recruiterModel.find({phone:req.body.user}).then((userData)=> {
            if(userData.length) {
                bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                    if(val) {
                        const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                        res.status(200).send({authToken});
                    } else {
                        res.status(400).send("Invalid Password");
                    }
                })
            } else {
               res.status(400).send("No user with given Details")
            }
        })
        }
    })
});
router.get("/details",(req,res)=>{
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
        recruiterModel.find({ email: decoded }).then((data) => {
            
        res.status(200).send(data[0])
    }).catch((err) => {
        res.status(400).send(err)
    })
        })
    } else {
        return res.status(500).json({
            status: "failed",
            message: "Invalid token"
        })
    }
})
router.post("/logout", (req, res)=> {
    res.status(200).send("logout works");
});
module.exports=router