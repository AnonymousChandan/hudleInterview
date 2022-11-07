const express = require("express")
const fs =require("fs")
const fetch = require('node-fetch')
const applicantSchema = require("../../schema/JobApplicant")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const jwt = require("jsonwebtoken")
const { generatePasswordHash } = require("../../utility")
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profile')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

router.post("/register", (req, res) => {
    const upload = multer({ storage }).array('file')

    upload(req, res,async  (err) => {
        const obj = JSON.parse(JSON.stringify(req.body))
        // let img=await fetch(__dirname+"/../../"+req.files[0].path)
        // let imageBuffer=Buffer.from(await img.arrayBuffer())
        var imgProfile=base64_encode(__dirname+"/../../"+req.files[0].path)
        var imgProfiles=base64_encode(__dirname+"/../../"+req.files[1].path)
        generatePasswordHash(req.body.password).then((passwordHash) => {
            applicantSchema.create({
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
               education:req.body.education,
               password: passwordHash,
               skills:req.body.skills,
               resume:imgProfile,
               profile:imgProfiles
            })
            if (err) {
                return res.status(500).json(err)
            }
    
            return res.status(200).send("")
        })
    })
})
router.post("/login", (req, res) => {
    applicantSchema.find({ email: req.body.user }).then((userData) => {
        if (userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                if (val) {
                    const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                    res.status(200).send({ authToken });
                } else {
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            applicantSchema.find({ phone: req.body.user }).then((userData) => {
                if (userData.length) {
                    bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                        if (val) {
                            const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                            res.status(200).send({ authToken });
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
router.get("/details", (req, res) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }

        applicantSchema.find({ email: decoded }).then((data) => {
            
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
router.post("/logout", (req, res) => {
    res.status(200).send("logout works");
});
module.exports = router