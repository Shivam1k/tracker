const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Application = require("../models/Application");

/* ADD INTERNSHIP */
router.post("/add", auth, async (req, res) => {
  const { company, role } = req.body;

  if (!company || !role) {
    return res.status(400).json({ msg: "Company and role required" });
  }

  try {
    const app = new Application({
      userId: req.user,
      company,
      role
    });

    await app.save();
    res.json({ msg: "Internship added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* GET USER INTERNSHIPS */
router.get("/", auth, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* GET SINGLE INTERNSHIP */
router.get("/:id", auth, async (req, res) => {
  try {
    const app = await Application.findOne({ _id: req.params.id, userId: req.user });
    if (!app) {
      return res.status(404).json({ msg: "Application not found" });
    }
    res.json(app);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// /* UPDATE STATUS (OWNER ONLY) */
// router.put("/update/:id", auth, async (req, res) => {
//   const { status } = req.body;

//   try {
//     const app = await Application.findOne({
//       _id: req.params.id,
//       userId: req.user
//     });

//     if (!app) {
//       return res.status(404).json({ msg: "Application not found" });
//     }

//     app.status = status;
//     await app.save();

//     res.json({ msg: "Status updated" });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });


router.put("/update/:id", auth, async (req, res) => {
  const { company, role, status } = req.body;

  try {
    const app = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { company, role, status },
      { new: true }
    );

    if (!app) {
      return res.status(404).json({ msg: "Internship not found" });
    }

    res.json({
      msg: "Internship updated successfully",
      app,
    });
  } catch (error) {
    res.status(500).json({ msg: "Update failed" });
  }
});


router.delete("/:id", auth, async (req, res) => {
  const app = await Application.findOneAndDelete({
    _id: req.params.id,
    userId: req.user,
  });

  if (!app) {
    return res.status(404).json({ msg: "Internship not found" });
  }

  res.json({ msg: "Internship deleted successfully" });
});


module.exports = router;
