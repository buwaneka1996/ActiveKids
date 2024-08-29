
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { drawKeypoints, drawSkeleton } from './Utils'; 

const PushupExercise = ({ onClose }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [count, setCount] = useState(0);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [poseState, setPoseState] = useState('up');
    const [progress, setProgress] = useState(0);
    const [stabilityCounter, setStabilityCounter] = useState(0);

    const stablePoseThreshold = 3; 
    const angleThreshold = { up: 150, down: 70 }; 


    const calculateAngle = (a, b, c) => {
        const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
        const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
        return Math.acos((ab * ab + bc * bc - ac * ac) / (2 * ab * bc)) * (180 / Math.PI);
    };

    const detectPushup = useCallback((pose) => {
        const leftShoulder = pose.keypoints.find(point => point.name === 'left_shoulder');
        const rightShoulder = pose.keypoints.find(point => point.name === 'right_shoulder');
        const leftElbow = pose.keypoints.find(point => point.name === 'left_elbow');
        const rightElbow = pose.keypoints.find(point => point.name === 'right_elbow');
        const leftWrist = pose.keypoints.find(point => point.name === 'left_wrist');
        const rightWrist = pose.keypoints.find(point => point.name === 'right_wrist');
    
        if (leftShoulder && rightShoulder && leftElbow && rightElbow && leftWrist && rightWrist) {
            const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
            const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
    
            const avgArmAngle = (leftArmAngle + rightArmAngle) / 2;
            setProgress(avgArmAngle); 
    
            console.log(`Average Arm Angle: ${avgArmAngle}`);
            console.log(`Current Pose State: ${poseState}`);
            console.log(`Stability Counter: ${stabilityCounter}`);
    
            // down position
            if (avgArmAngle < angleThreshold.down || poseState === 'down') {
                console.log('Potential Down Position Detected');
                if (stabilityCounter >= stablePoseThreshold) {
                    setPoseState('down');
                    setStabilityCounter(0); 
                    console.log('Transitioned to Down Position'); 
                } else {
                    setStabilityCounter(stabilityCounter + 1);
                }
            } else if (avgArmAngle >= angleThreshold.down && poseState === 'up') {
                setStabilityCounter(0);
            }
    
            // up position 
            if (avgArmAngle > angleThreshold.up && poseState === 'up') {
                console.log('Potential Up Position Detected');
                if (stabilityCounter >= stablePoseThreshold) {
                    setPoseState('up');
                    setCount(prevCount => prevCount + 1);
                    setStabilityCounter(0); 
                    console.log('Pushup Count Increased');
                } else {
                    setStabilityCounter(stabilityCounter + 1);
                }
            } else if (avgArmAngle <= angleThreshold.up || poseState === 'down') {
                setStabilityCounter(0);
            }
        }
    }, [poseState, stabilityCounter, angleThreshold.down, angleThreshold.up, stablePoseThreshold]);
    

    const drawArmAngles = useCallback((keypoints, ctx) => {
        const leftElbow = keypoints.find(point => point.name === 'left_elbow');
        const rightElbow = keypoints.find(point => point.name === 'right_elbow');
    
        if (leftElbow && rightElbow) {
            const leftShoulder = keypoints.find(point => point.name === 'left_shoulder');
            const leftWrist = keypoints.find(point => point.name === 'left_wrist');
            const rightShoulder = keypoints.find(point => point.name === 'right_shoulder');
            const rightWrist = keypoints.find(point => point.name === 'right_wrist');
    
            if (leftShoulder && leftWrist && rightShoulder && rightWrist) {
                const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
                const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
    
                console.log(`Left Arm Angle: ${leftArmAngle}`);
                console.log(`Right Arm Angle: ${rightArmAngle}`);
    
                // Draw left arm angle
                ctx.fillStyle = 'red';
                ctx.font = '24px Arial';
                ctx.fillText(
                    `${Math.round(leftArmAngle)}°`,
                    leftElbow.x * canvasRef.current.width,
                    leftElbow.y * canvasRef.current.height - 10
                );
    
                // Draw right arm angle
                ctx.fillStyle = 'blue';
                ctx.fillText(
                    `${Math.round(rightArmAngle)}°`,
                    rightElbow.x * canvasRef.current.width,
                    rightElbow.y * canvasRef.current.height - 10
                );
            } else {
                console.warn('Missing keypoints for angle calculation');
            }
        } else {
            console.warn('Elbow keypoints not detected');
        }
    }, []);
    

    useEffect(() => {
        const loadPosenet = async () => {
            await tf.ready();
            await tf.setBackend('webgl');

            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            });

            const detectPose = async () => {
                if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                    const video = webcamRef.current.video;
                    const pose = await detector.estimatePoses(video);

                    // Push-up detection 
                    detectPushup(pose[0]);

                    // Drawing keypoints and skeleton on canvas
                    const ctx = canvasRef.current.getContext('2d');
                    canvasRef.current.width = video.videoWidth;
                    canvasRef.current.height = video.videoHeight;
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    drawKeypoints(pose[0].keypoints, ctx);
                    drawSkeleton(pose[0].keypoints, ctx);

                    drawArmAngles(pose[0].keypoints, ctx);
                }
            };

            const interval = setInterval(detectPose, 100);
            return () => clearInterval(interval);
        };

        if (isCameraActive) {
            loadPosenet();
        }

    }, [isCameraActive, detectPushup, drawArmAngles]);

    const handleStopCamera = () => {
        setIsCameraActive(false);
        setCount(0);
        if (webcamRef.current && webcamRef.current.video.srcObject) {
            const tracks = webcamRef.current.video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
        onClose();
    };

    useEffect(() => {
        setIsCameraActive(true);
    }, []);

    return (
        <div>
            {isCameraActive && (
                <div className="video-container">
                    <Webcam ref={webcamRef} className='webcam' />
                    <canvas ref={canvasRef} className='canvas' />
                    <button className="close-btn" onClick={handleStopCamera}>Close</button>
                </div>
            )}
            {isCameraActive && <div className='pushup-count'>Pushup Count: {count}</div>}
            <div className='progress-bar'>
                <div className="progress"
                    style={{ width: `${Math.min(100, Math.max(0, 100 - (progress - 70) * 1.5))}%` }}>
                </div>
            </div>
        </div>
    );
};

export default PushupExercise;
