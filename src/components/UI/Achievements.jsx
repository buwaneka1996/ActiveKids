import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/achievements.css'

const Achievements = ({ email }) => {
    const [achievements, setAchievements ] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try{
                const response = await axios.get(`http://localhost:5001/achievements?email=${email}`);
                setAchievements(response.data);
            } catch (error){
                console.error("Error fetching achievements", error);
            }
        };

        fetchAchievements();
    }, [email]);

    return(
        <div className="achievements">
            <h2><span className='highlights'>Achivements</span></h2>
            <ul>
                {achievements.map((achievement, index) => (
                    <li key={index} className='achievement-badge'>
                        {achievement}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Achievements;
