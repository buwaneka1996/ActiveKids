import React, { useState } from "react";
import axios from "axios";
import "../../styles/workout.css";

const Workout = ({ email }) => {
  const [pushupCount, setPushupCount] = useState(0);
  const [squatCount, setSquatCount] = useState(0);
  const [achievement, setAchievement] = useState("");

  const completeWorkout = async () => {
    try {
      const parsedPushupCount = parseInt(pushupCount, 10);
      const parsedSquatCount = parseInt(squatCount, 10);
  
      if (isNaN(parsedPushupCount)) {
        alert("Please enter a valid number of pushups.");
        return;
      }

      if (isNaN(parsedSquatCount)) {
        alert("Please enter a valid number of squats.");
        return;
      }
  
      const response = await axios.post("http://localhost:5001/completeWorkout", {
        email,
        pushupCount: parsedPushupCount,
        squatCount: parsedSquatCount,
      });
  
      setAchievement(response.data.achievement);
    } catch (error) {
      console.error("Error completing workout:", error);
      console.log("Error object:", error);
  
      if (error.response && error.response.data) {
        const serverError = error.response.data.error || "Unknown error";
        const serverDetails = error.response.data.details || "No additional details provided.";
        alert(`Error completing workout: ${serverError} - ${serverDetails}`);
      } else {
        alert("An unexpected error occurred while completing the workout.");
      }
    }
  };

  return (
    <div className="workout">
      <h2>PushUp Workout</h2>
      <label>
        Number of Pushups:
        <input
          type="number"
          value={pushupCount}
          onChange={(e) => setPushupCount(e.target.value)}
        />
      </label>
      <button className="work-btn" onClick={completeWorkout}>
        Complete PushUp Workout
      </button>

      <h2>Squats Workout</h2>
      <label>
        Number of Squats:
        <input
          type="number"
          value={squatCount}
          onChange={(e) => setSquatCount(e.target.value)}
        />
      </label>
      <button className="work-btn" onClick={completeWorkout}>
        Complete Squat Workout
      </button>
      
      {achievement && <p>Achievement Unlocked: {achievement}</p>}
    </div>
  );
};

export default Workout;
