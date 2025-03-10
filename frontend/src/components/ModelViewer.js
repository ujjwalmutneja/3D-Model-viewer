// import React, { useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";

// const ModelViewer = ({ modelUrl }) => {
//   const [objectUrl, setObjectUrl] = useState(null);

//   useEffect(() => {
//     const fetchModel = async () => {
//       try {
//         const response = await fetch(modelUrl);
//         const blob = await response.blob();
//         setObjectUrl(URL.createObjectURL(blob));
//       } catch (error) {
//         console.error("Error loading model:", error);
//       }
//     };

//     fetchModel();
//   }, [modelUrl]);

//   if (!objectUrl) return <p>Loading Model...</p>;

//   return (
//     <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
//     <ambientLight intensity={0.5} />
//     <directionalLight position={[2, 2, 2]} intensity={1} />
//     <primitive object={scene} scale={1} />
//     <OrbitControls enableZoom={true} enablePan={true} />
//   </Canvas>
// );
// };

// const Model = ({ objectUrl }) => {
//   const { scene } = useGLTF(objectUrl);
//   return <primitive object={scene} scale={1.5} />;
// };
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useMemo } from "react";

// Function to convert Google Drive URL to direct link
const convertDriveLink = (url) => {
  if (!url) return null; // Ensure URL exists before processing
  const match = url.match(/\/d\/(.+?)\//);
  return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
};

const ModelViewer = ({ modelUrl }) => {
  console.log("🔥 ModelViewer component rendered with modelUrl:", modelUrl);

  // Ensure URL is valid and processed consistently
  const processedUrl = useMemo(() => convertDriveLink(modelUrl), [modelUrl]);
  console.log("🔗 Processed URL:", processedUrl);

  // Load the model, always call hooks at the top level
  const { scene } = useGLTF(processedUrl || "/models/default.gltf"); // Fallback model if URL is missing

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <primitive object={scene} scale={1} />
        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
