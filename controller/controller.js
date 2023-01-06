const userModel = require("../model/model")
const bcryptjs = require("bcryptjs")


const registerUser = (req, res) => {
    const newUser = req.body
    const email = newUser.email
    userModel.findOne({ email: email }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(501).send({ message: "Internal server error", status: false })
        } else {
            if (result) {
                res.send({ message: "Email already exists in our database", status: false })
            } else {
                const form = new userModel(newUser)
                form.save((err) => {
                    if (err) {
                        console.log("an error occured");
                        res.send({ message: "user signup failed", status: false })
                    } else { res.send({ message: "registration successful", status: true }) }
                })
            }
        }
    })
}

const signIn = (req, res) => {
    let password = req.body.password
    let email = req.body.email
    userModel.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(501).send({ message: "Internal server error. Please try again", status: false })
        } else {
            if (!user) {
                res.send({message:"Invalid email", status:false})
            }else{
                bcryptjs.compare(password, user.password, (err, same)=>{
                    if (err) {
                        console.log(err);
                        res.send({message:"Internal server error. Please try again", status:false})
                    }else if(same){
                        res.send({ message: "welcome", status: true, result: { fullName: user.fullName, email: user.email, } })
                    }else if(!same){
                        res.send({ message: "Invalid log in details", status: false })
                    }
                })
            }
        }
    })
}

module.exports = { registerUser, signIn }