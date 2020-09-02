// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video1;
let poseNet1;
let poses1 = [];

function setup() {
  createCanvas(640, 480);
  video1 = createCapture(VIDEO);
  video1.size(width, height);

  // Create a new poseNet1 method with a single detection
  poseNet1 = ml5.poseNet(video1, modelReady);
  // This sets up an event that fills the global variable "poses1"
  // with an array every time new poses1 are detected
  poseNet1.on('pose', function(results) {
    poses1 = results;
  });
  // Hide the video1 element, and just show the canvas
  video1.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video1, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses1 detected
  for (let i = 0; i < poses1.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses1[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses1.length; i++) {
    let skeleton = poses1[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
