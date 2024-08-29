import React, { useState, useEffect } from 'react';
import { Dumbbell } from "lucide-react";
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
//import { Button } from '@mui/material';
import '../../styles/bmi.css';

const BMI = ({ userHeight, userWeight }) => {
  const [weight, setWeight] = useState(userWeight || '');
  const [height, setHeight] = useState(userHeight || '');
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    if (userHeight && userWeight) {
      setHeight(userHeight);
      setWeight(userWeight);
    }
  }, [userHeight, userWeight]);

  const calculateBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const bmi = (weight / ((height * height) / 10000)).toFixed(2);
      setBmi(bmi);
    } else {
      setBmi(null);
    }
  };

  useEffect(() => {
    if (height && weight) {
      calculateBMI(height, weight);
    }
  }, [height, weight]);

  return (
    <section id='bmi' data-aos='zoom-in' data-duration='1500'>
      <div className='bmi-container'>
        <div className='bmi-content'>
          <h2 className='bmi-header'>
            <Dumbbell className='bmi-icon' />
            Calculate Your BMI
          </h2>

          <div className='bmi-inputs'>
            <div className='bmi-input-group'>
              <Label htmlFor='weight'>Weight (kg)</Label>
              <Input
                id='weight'
                name='weight'
                type='number'
                placeholder='Enter your weight'
                value={weight}
                onChange={(e) => {
                  const value = e.target.value;
                  setWeight(value);
                }}
              />
            </div>

            <div className='bmi-input-group'>
              <Label htmlFor='height'>Height (cm)</Label>
              <input
                id='height'
                name='height'
                type='number'
                placeholder='Enter your height'
                value={height}
                onChange={(e) => {
                  const value = e.target.value;
                  setHeight(value);
                }}
              />
            </div>

           {/* <div className='bmi-button-group'>
              <Button variant='contained' onClick={() => calculateBMI(height, weight)}>Calculate BMI</Button>
            </div> */}
          </div>
    
          

          {bmi !== null && (
            <div className='bmi-result'>
              <p>Your BMI : <span className='bmi-value'>{bmi}</span></p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BMI;
