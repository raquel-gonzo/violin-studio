const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const auth = require("../middleware/auth");

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
      confirmPassword,
    } = req.body;

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

    if (!confirmPassword) {
      return res.status(400).json({ msg: "Confirm your password." });
    }

    if (password !== confirmPassword) {
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
    const foundStudent = await Student.findOne({
      email: savedStudent.email
    });
    // if there is a user registered in the database, give them a json web token.
    const token = await jwt.sign({ id: foundStudent._id }, process.env.JWT_SECRET); // from the student document, the id (postman) is points to who is logged in. the token will retrieve the id of the currently logged in user. Create a JWT secret.

    res.json({
      token,
      student: {
        id: foundStudent._id,
        firstName: foundStudent.firstName,
        // email: savedStudent.email,
      },
    });
    // res.json(savedStudent);

    return res.status(200).json({ msg: "Success!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// after validating that the user is the correct one to log in, create a JWT to determine how long the user will stay logged in for.
router.post("/login", async (req, res) => {
  try {
    const { firstName, password } = req.body; // destructuring the post req.

    //validate --> we can't login if nothing is input.
    if (!firstName || !password) {
      return res.status(400).json({ msg: "First Name and Password are required." });
    }
    // does the pw belong to the corresponding email?
    const student = await Student.findOne({ firstName: firstName });

    // if the student does not exist
    if (!student) {
      return res
        .status(400)
        .json({ msg: "There is no account associated with that name." });
    }

    //match the passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid login credentials." });
    }

    // if there is a user registered in the database, give them a json web token.
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET); // from the student document, the id (postman) is points to who is logged in. the token will retrieve the id of the currently logged in user. Create a JWT secret.
    res.json({
      token,
      student: {
        id: student._id,
        firstName: student.firstName,
        tasks: student.tasks
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const student = await Student.findById(verified.id);
    if (!student) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const student = await Student.findById(req.student);
  res.json({
    firstName: student.firstName,
    lastName: student.lastName,
    tasks: student.tasks,
    id: student._id
  });
});

router.put("/registerTask", auth, async (req, res) => {
  try {

    if (req.body.tasks.length === 0) {
      return;
    }
    const update = { tasks: req.body.tasks }
    const student = await Student.findOneAndUpdate({_id: req.body.tasks[0].studentId}, update, {
      new: true
    });

    if (!student) {
      res.json({
        message: "student is null"
      })
    }
    res.json({
      firstName: student.firstName,
      lastName: student.lastName,
      tasks: student.tasks,
      id: student._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/deleteTask/:studentId/:taskTitle", async (req, res) => {
  try {
    // make sure student is deleting a task that belongs to them.
    const student = await Student.findOne({ _id: req.params.studentId });

    if (!student)
      return res
      .status(400)
      .json({ 
        msg: "No student found with this ID." 
      });
    const { tasks } = student; //destructure student object 
    // we only want to keep the tasks which don't match the title of the one we're passing
    const filteredTasks = tasks.filter(task => task.title !== req.params.taskTitle); 
    
    // update the tasks on the student to filteredTasks
    const updatedTasks = { tasks: filteredTasks }; // utting filtered tasks (the ones we are keeping) into a new JS object, updated tasks. 
    // first param of findOneAndUpdate: finding the student by id
    // second param of findOneAndUpdate: what are we updating? in this case, the tasks
    // the third param enables us to put the result of the update in a variable
    const updatedStudent = await Student.findOneAndUpdate({_id: req.params.studentId}, updatedTasks, { // making a req to the DB passing the JS object, updated tasks as a second param
      new: true
    });

    if (!updatedStudent) {
      res.json({
        message: "student failed to update"
      })
    }
    res.json(filteredTasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
