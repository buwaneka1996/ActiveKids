const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

//password: 3vytNfbqkX2rHgAz
//mongodb+srv://goonethillekab:3vytNfbqkX2rHgAz@cluster0.bltyhie.mongodb.net/ActiveKids
//mongodb://localhost:27017/ActiveKids

mongoose.connect(
    "mongodb+srv://goonethillekab:3vytNfbqkX2rHgAz@cluster0.bltyhie.mongodb.net/ActiveKids",
    
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  height: Number,
  weight: Number,
  achievements: [String],
  workouts: {    
    pushups: { type: Number, default: 0 },
    squats: { type: Number, default: 0},   
  },
});

const User = mongoose.model("User", userSchema);

// Registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, height, weight } = req.body;
    if (!username || !email || !password || !height || !weight) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const newUser = new User({ username, email, password, height, weight, achievements: [], workouts: { pushups: 0 } });
    await newUser.save();
    console.log("User registered:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Server error");
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", username: user.username, height: user.height, weight: user.weight }); 
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error");
  }
});

// Add achievement
app.post("/add-achievement", async (req, res) => {
  try {
    const { email, achievement } = req.body;
    if (!email || !achievement) {
      return res.status(400).json({ error: "Email and achievement are required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    if (!user.achievements.includes(achievement)) {
      user.achievements.push(achievement);
      await user.save();
    }

    res.status(200).send("Achievement added");
  } catch (error) {
    console.error("Add achievement error:", error);
    res.status(500).send("Server error");
  }
});

// Get achievements
app.get("/achievements", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user.achievements);
  } catch (error) {
    console.error("Get achievements error:", error);
    res.status(500).send("Server error");
  }
});

//workout completion
app.post("/completeWorkout", async (req, res) => {
  const { email, pushupCount, squatCount } = req.body;

  try {
    console.log("Received request:", { email, pushupCount, squatCount });

    // Check for missing or invalid values
    if (!email || typeof pushupCount !== "number" || isNaN(pushupCount) || typeof squatCount !== "number" || isNaN(squatCount)) {
      return res.status(400).json({
        error: "Invalid input",
        details: "Email, pushup count, and squat count must be provided and valid.",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      console.log("User not found, creating a new one.");
      user = new User({ email, achievements: [], workouts: { pushups: 0, squats: 0 } });
    }

    user.workouts.pushups += pushupCount;
    user.workouts.squats += squatCount;

    let achievement = "";
    const pushupMilestones = [10, 15, 20, 25, 30];
    const squatMilestones = [10, 15, 20, 25, 30];
    
    // Check for achievements based on pushup milestones
    pushupMilestones.forEach(milestone => {
      if (user.workouts.pushups >= milestone &&
          !user.achievements.includes(`${milestone} Pushups Completed`)) {
        user.achievements.push(`${milestone} Pushups Completed`);
        achievement = `${milestone} Pushups Completed`;
      }
    });

    // Check for achievements based on squat milestones
    squatMilestones.forEach(milestone => {
      if (user.workouts.squats >= milestone &&
          !user.achievements.includes(`${milestone} Squats Completed`)) {
        user.achievements.push(`${milestone} Squats Completed`);
        achievement = `${milestone} Squats Completed`;
      }
    });

    await user.save();

    console.log("Workout completed successfully for user:", email);
    res.status(200).send({ achievement });
  } catch (error) {
    console.error("Error completing workout:", error);
    res.status(500).send({
      error: "Server error",
      details: error.message || "An unknown error occurred.",
    });
  }
});

  
const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
