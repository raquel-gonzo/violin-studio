const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Student = require("../models/student.model");

router.post("/register", async (req, res) => {
  try {
    // destructure all fields from the object.
    const {
      firstName,
      lastName,
      yearInSchool,
      school,
      phone,
      email,
      password,
      passwordCheck,
    } = req.body;
    // const { firstName, email, password, passwordCheck} = req.body;

    //validate
    if (!firstName) {
      return res.status(400).json({ msg: "First name is required" });
    }

    if (!lastName) {
      return res.status(400).json({ msg: "Last name is required." });
    }

    if (!yearInSchool) {
      return res.status(400).json({ msg: "Student's grade is required." });
    }

    if (!school) {
      return res
        .status(400)
        .json({ msg: "Student's current school is required." });
    }

    if (!phone) {
      return res.status(400).json({ msg: "A phone number is required." });
    }

    if (!email) {
      return res.status(400).json({ msg: "Email is required." });
    }

    if (!password) {
      return res.status(400).json({ msg: "Password is required." });
    }

    if (!passwordCheck) {
      return res.status(400).json({ msg: "Confirm your password." });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords don't match." });
    }

    const existingStudent = await Student.findOne({
      firstName: firstName,
      lastName: lastName,
    });
    if (existingStudent) {
      return res.status(400).json({ msg: "Account already exists." });
    }

    // pw hash wit bcrypt.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    const newStudent = new Student({
      firstName,
      lastName,
      yearInSchool,
      school,
      phone,
      email,
      password: passwordHash,
    });

    const savedStudent = await newStudent.save();
    res.json(savedStudent);

    return res.status(200).json({ msg: "Success!" });
  } catch (err) {
    res.status(500).json({ err });
    //res.status(500).json({ error: err. message (or err.msg)})
  }
});

// after validating that the user is the correct one to log in, create a JWT to determine how long the user will stay logged in for.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
