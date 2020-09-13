const router = require("express").Router();
const Student = require("../models/student.model");

router.post("/register", async (req, res) => {
    try{
    // destructure all fields from the object.
    // const { firstName, lastName, yearInSchool, school, phone, email, password, passwordCheck} = req.body;
    const { firstName, email, password, passwordCheck} = req.body;


    //validate
    // if ( !firstName || !lastName || !yearInSchool || !school || !phone || !email || !password || !passwordCheck){
    //     return res.status(400).json({msg: "Not all fields have been entered."});
    // }
    if ( !firstName || !email || !password || !passwordCheck){
        return res.status(400).json({msg: "Not all fields have been entered."});
    }


    if (password !== passwordCheck){
        return res
            .status(400)
            .json({ msg: "Passwords don't match."})
    }
    
    const existingStudent = await Student.findOne({email: email});
    if (existingStudent) {
        return res
            .status(400)
            .json({ msg: "Account already exists."})
    }

    
    return res.status(200).json({msg: "Success!"});

    } catch (err) { 
        res.status(500).json({err});
    }
});

module.exports = router;