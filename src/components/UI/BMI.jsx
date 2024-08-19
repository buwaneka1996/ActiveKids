import React, { useState } from 'react'
import { Dumbbell } from "lucide-react";
import Label from '../../components/Label/Label';
import Input from '../../components/Input/Input';
import { Button } from '@mui/material';
import '../../styles/bmi.css';

const BMI = () => {
    
 //logic to write bmi 
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  //function to calculate bmi
  const calculateBMI = () => {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    setBmi(bmi);
  };
  
  return (
    <section id='bmi'
    data-aos='zoom-in'
                    data-duration='1500'>
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
                onChange={(e) => setWeight(e.target.value)}
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
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className='bmi-button-group'>
              <Button variant='contained' onClick={calculateBMI}>Calculate BMI</Button>
            </div>
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
export default BMI