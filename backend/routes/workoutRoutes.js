// const express = require("express");
// const { addWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout } = require("../controllers/workoutController");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Routes
// router.post("/", protect, addWorkout); 
// router.get("/", protect, getWorkouts); 
// router.get("/:id", protect, getWorkoutById);
// router.put("/:id", protect, updateWorkout); 
// router.delete("/:id", protect, deleteWorkout); 

// module.exports = router;



const express = require("express");
const {
    addWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout
} = require("../controllers/workoutController"); // Ensure correct path

const { protect } = require("../middleware/authMiddleware"); // Ensure authentication middleware

const router = express.Router();

router.route("/").get(protect, getWorkouts).post(protect, addWorkout);
router.route("/:id").get(protect, getWorkoutById).put(protect, updateWorkout).delete(protect, deleteWorkout);

module.exports = router;


