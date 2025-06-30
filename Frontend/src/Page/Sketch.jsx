import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@mui/material";

const Sketch = () => {
  const [opencamera, setOpencamera] = useState(false);
  const videoRef = useRef(null); 
  const canvasRef = useRef(null);
  let p5Instance = useRef(null);

  useEffect(() => {
    if (opencamera) {
      startCamera();
    } else {
      stopCamera();
    }
    
    // Cleanup function to stop p5 sketch when component unmounts
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [opencamera]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true }); //ask for video permission
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", () => {
          setupPoseDetection(); // Setup PoseNet once video is ready
        });
      }
    } catch (error) {
      console.error("Camera permission issue:", error);
      alert("Please allow camera access in your browser settings.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      let stream = videoRef.current.srcObject;
      let tracks = stream.getTracks();
  
      tracks.forEach(track => track.stop());  // Stop all tracks
      videoRef.current.srcObject = null;  // Remove video source
    }
    
    // Remove p5 sketch
    if (p5Instance.current) {
      p5Instance.current.remove();
      p5Instance.current = null;
    }
    
    setOpencamera(false);
  };

  const setupPoseDetection = () => {
    // Make sure we have the video element ready
    if (!videoRef.current) return;
    
    // Create a new p5 instance
    const newP5 = new p5((sketch) => {
      let poseNet;
      let singlePose = null;
      let skeleton = null;
      let correctPosture = false;

      sketch.setup = () => {
        // Create canvas that matches video dimensions
        const canvas = sketch.createCanvas(640, 480);
        canvas.parent(canvasRef.current);
        
        // Initialize poseNet
        poseNet = ml5.poseNet(videoRef.current, modelReady);
        
        // This function runs when PoseNet is ready
        function modelReady() {
          console.log("PoseNet Model Loaded!");
        }
        
        // This sets up the callback that receives the results
        poseNet.on("pose", (poses) => {
          if (poses.length > 0) {
            singlePose = poses[0].pose;
            skeleton = poses[0].skeleton;
            checkPosture(singlePose);
          }
        });
      };
      console.log("sd",sketch.draw)
      sketch.draw = () => {
        sketch.clear();
        
        // Only draw if we have pose data
        if (singlePose && skeleton) {
          // Draw keypoints
          sketch.fill(255, 0, 0);
          sketch.noStroke();
          
          for (let i = 0; i < singlePose.keypoints.length; i++) {
            let x = singlePose.keypoints[i].position.x;
            let y = singlePose.keypoints[i].position.y;
            sketch.ellipse(x, y, 20);
          }
          
          // Draw skeleton
          sketch.stroke(255, 255, 255);
          sketch.strokeWeight(3);
          
          for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            sketch.line(
              partA.position.x, partA.position.y,
              partB.position.x, partB.position.y
            );
          }
          
          // Display posture status
          sketch.fill(checkPosture ? "green" : "red");
          sketch.noStroke();
          sketch.textSize(24);
          sketch.text(
            correctPosture ? "✅ Good Posture!" : "❌ Fix Your Posture!",
            20, 40
          );
        }
      };

     const checkPosture = (pose) => {
        if (!pose) return;
        let leftShoulder = pose.leftShoulder;
        let rightShoulder = pose.rightShoulder;
        let leftHip = pose.leftHip;
        let rightHip = pose.rightHip;

        // Make sure these points were detected
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
          correctPosture = false;
          return;
        }

        let shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
        let hipDiff = Math.abs(leftHip.y - rightHip.y);

        correctPosture = shoulderDiff < 20 && hipDiff < 20;
      };
     
  
    });
    
    p5Instance.current = newP5;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "55px" }}>
        <button
          onClick={() => setOpencamera(true)}
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            padding: "12px 24px",
            fontSize: "18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginRight: "15px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4444")}
        >
          🎥 Start Camera
        </button>

        <button
          onClick={() => stopCamera()}
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "12px 24px",
            fontSize: "18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginLeft: "15px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#111")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
        >
          ❌ Stop Camera
        </button>
      </div>

      {opencamera && (
        <div style={{ marginTop: "20px", textAlign: "center", position: "relative" }}>
          <Typography variant="h6">Pose Detection Active</Typography>
          <div style={{ position: "relative", width: "100%", maxWidth: "640px", margin: "0 auto" }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              width="640" 
              height="480" 
              style={{ width: "100%" }}
            ></video>
            <div 
              ref={canvasRef} 
              style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%" 
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sketch;