const router = require("express").Router();
const auth = require("../middleware/auth");
const Task = require("../models/task.model");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    //validation
    if (!title)
      return res
        .status(400)
        .json({ msg: "Enter a task to practice. " });

    const newTask = new Task({
      title,
      studentId: req.student,
    });

    // saves tasks to a student id
    const savedTask = await newTask.save();
    res.json(savedTask);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  try {

    //gets all tasks as an array from the user.
    const tasks = await Task.find({ studentId: req.student });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.delete("/:id", auth, async (req, res) => {
  // make sure student is deleting a task that belongs to them.
  const task = await Task.findOne({ studentId: req.student, _id: req.params.id });
  if (!task)
    return res
    .status(400)
    .json({ 
      msg: "No task found with this ID that belongs to this student." 
    });
  // if the id is something that can be deleted:
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(deletedTask);
})

module.exports = router;
