import React from "react";
import Achievements from "./Achievements";
import Workout from "./Workout";
import '../../styles/profile.css';

const Profile = ({ user }) =>{
    
    

    return (
        <div className="profile">
            <h1>{user.email}'s Profile</h1>
            <Achievements email={user.email} />
            <Workout email={user.email}/>
            
        </div>
    );
};

export default Profile;

