import * as poseDetection from '@tensorflow-models/pose-detection';

/*
export const drawKeypoints = (keypoints, ctx) => {
    keypoints.forEach((keypoint) => {
        if (keypoint.score > 0.5) {
            const { y, x } = keypoint;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    });
};

export const drawSkeleton = (keypoints, ctx) => {
    const adjacentKeyPoints = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);
    adjacentKeyPoints.forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (kp1.score > 0.5 && kp2.score > 0.5) {
            ctx.beginPath();
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
    });
};
*/

export const drawKeypoints = (keypoints, ctx) => {
    keypoints.forEach(keypoint => {
        if (keypoint.score > 0.2) {
            const { y, x } = keypoint;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    });
};

export const drawSkeleton = (keypoints, ctx) => {
    const adjacentPairs = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);
    adjacentPairs.forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (kp1.score > 0.2 && kp2.score > 0.2) {
            ctx.beginPath();
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
};

