import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { drawKeypoints, drawSkeleton } from './Utils';
import '../../styles/exercisesItems.css';

const SquatExercise = ({ onClose }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [count, setCount] = useState(0);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const wasFullRef = useRef(false);
    const [progress, setProgress] = useState(0);
   
    //const [poseState, setPoseState] = useState('up');
    //const [stableFrames, setStableFrames] = useState(0);
    


   /* const detectSquat = useCallback(
        (pose) => {
            const leftHip = pose.keypoints.find(point => point.name === 'left_hip');
            const rightHip = pose.keypoints.find(point => point.name === 'right_hip');
            const leftKnee = pose.keypoints.find(point => point.name === 'left_knee');
            const rightKnee = pose.keypoints.find(point => point.name === 'right_knee');
            const leftAnkle = pose.keypoints.find(point => point.name === 'left_ankle');
            const rightAnkle = pose.keypoints.find(point => point.name === 'right_ankle');

            if (leftHip && rightHip && leftKnee && rightKnee && leftAnkle && rightAnkle) {
                const leftLegAngle = calculateLegAngle(leftHip, leftKnee, leftAnkle);
                const rightLegAngle = calculateLegAngle(rightHip, rightKnee, rightAnkle);
                const avgLegAngle = (leftLegAngle + rightLegAngle) / 2;
                setProgress(avgLegAngle);

                const isDown = avgLegAngle < 90; 
                const isUp = avgLegAngle > 160; 

                if (isDown) {
                    if (poseState === 'up') {
                        setStableFrames((prev) => prev + 1);
                        if (stableFrames > 5) {
                            setPoseState('down');
                            setStableFrames(0);
                        }
                    } else {
                        setStableFrames(0);
                    }
                } else if (isUp) {
                    if (poseState === 'down') {
                        setStableFrames((prev) => prev + 1);
                        if (stableFrames > 5) {
                            setPoseState('up');
                            setCount((prevCount) => prevCount + 1);
                            setStableFrames(0);
                        }
                    } else {
                        setStableFrames(0);
                    }
                } else {
                    setStableFrames(0);
                }
            }
        },
        [poseState, stableFrames]
    );*/

    const speakCount = (count) => {
        const msg = new SpeechSynthesisUtterance(`${count}`);
        window.speechSynthesis.speak(msg);
    };
    
    const detectSquat = useCallback((pose) => {
        const leftHip = pose.keypoints.find(point => point.name === 'left_hip');
        const rightHip = pose.keypoints.find(point => point.name === 'right_hip');
        const leftKnee = pose.keypoints.find(point => point.name === 'left_knee');
        const rightKnee = pose.keypoints.find(point => point.name === 'right_knee');
        const leftAnkle = pose.keypoints.find(point => point.name === 'left_ankle');
        const rightAnkle = pose.keypoints.find(point => point.name === 'right_ankle');
    
        if (leftHip && rightHip && leftKnee && rightKnee && leftAnkle && rightAnkle) {
            const leftLegAngle = calculateLegAngle(leftHip, leftKnee, leftAnkle);
            const rightLegAngle = calculateLegAngle(rightHip, rightKnee, rightAnkle);
    
            const avgLegAngle = (leftLegAngle + rightLegAngle) / 2;
            setProgress(avgLegAngle); 

            
            const progressWidth = Math.min(100, Math.max(0, 100 - (avgLegAngle - 70) * 1.5));

            
            if (progressWidth === 100) {
                wasFullRef.current = true;
            } else if (progressWidth === 0 && wasFullRef.current) {
                setCount(prevCount => {
                    const count = prevCount + 1;
                    if (wasFullRef.current) { 
                        speakCount(count);
                        wasFullRef.current = false; 
                    }
                    return count;
            });
        }
        }
    }, []);

    useEffect(() => {
        const loadPoseNet = async () => {
            await tf.ready();
            await tf.setBackend('webgl');

            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            });

            const detectPose = async () => {
                if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                    const video = webcamRef.current.video;
                    const poses = await detector.estimatePoses(video);

                    if (poses.length > 0) {
                        detectSquat(poses[0]);
                    }

                    const ctx = canvasRef.current.getContext('2d');
                    canvasRef.current.width = video.videoWidth;
                    canvasRef.current.height = video.videoHeight;
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    drawKeypoints(poses[0].keypoints, ctx);
                    drawSkeleton(poses[0].keypoints, ctx);
                }
            };

            const interval = setInterval(detectPose, 100);
            return () => clearInterval(interval);
            
        };

        if (isCameraActive) {
            loadPoseNet().catch(console.error);
        }
    }, [isCameraActive, detectSquat]);

    const calculateLegAngle = (hip, knee, ankle) => {
        const thigh = Math.sqrt(Math.pow(knee.x - hip.x, 2) + Math.pow(knee.y - hip.y, 2));
        const calf = Math.sqrt(Math.pow(ankle.x - knee.x, 2) + Math.pow(ankle.y - knee.y, 2));
        const hipToAnkle = Math.sqrt(Math.pow(ankle.x - hip.x, 2) + Math.pow(ankle.y - hip.y, 2));
        return (
            Math.acos((thigh * thigh + calf * calf - hipToAnkle * hipToAnkle) / (2 * thigh * calf)) *
            (180 / Math.PI)
        );
    };

    const handleStopCamera = () => {
        setIsCameraActive(false);
        setCount(0);
        if (webcamRef.current && webcamRef.current.video.srcObject) {
            const tracks = webcamRef.current.video.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
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
                    <Webcam ref={webcamRef} className="webcam" />
                    <canvas ref={canvasRef} className="canvas" />
                    <button className="close-btn" onClick={handleStopCamera}>
                        Close
                    </button>
                </div>
            )}
            {isCameraActive && <div className="squat-count">Squat Count: {count}</div>}
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${Math.min(100, Math.max(0, 100 - (progress - 70) * 1.5))}%` }}
                ></div>
            </div>
        </div>
    );
};

export default SquatExercise;
