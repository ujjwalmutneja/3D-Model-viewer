// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ModelViewer from "./components/ModelViewer";

// const App = () => {
//   const [models, setModels] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedModel, setSelectedModel] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/models").then((response) => {
//       setModels(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>3D Model Viewer</h1>
//       <input
//         type="text"
//         placeholder="Search models..."
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <ul>
//         {models
//           .filter((model) => model.name.toLowerCase().includes(search.toLowerCase()))
//           .map((model) => (
//             <li key={model.id} onClick={() => setSelectedModel(model.url)}>
//               {model.name}
//             </li>
//           ))}
//       </ul>
//       {selectedModel && <ModelViewer modelUrl={selectedModel} />}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import ModelViewer from "./components/ModelViewer";
import "./App.css";

const App = () => {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);

  // Fetch models from backend
  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log("🔄 Fetching models from backend...");
        const response = await fetch("http://localhost:5000/models");
        const data = await response.json();
        console.log("✅ Models fetched successfully:", data);
        setModels(data);
      } catch (error) {
        console.error("❌ Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  // Log selected model when changed
  useEffect(() => {
    console.log("📌 Selected Model Updated:", selectedModel);
  }, [selectedModel]);

  return (
    <div>
      <h1>3D Model Viewer</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search models..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Model List */}
      <ul>
        {models
          .filter((model) =>
            model.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((model) => (
            <li
              key={model.id}
              onClick={() => {
                console.log("🖱 Clicked on model:", model.name, "URL:", model.url);
                setSelectedModel(model.url);
              }}
            >
              {model.name}
            </li>
          ))}
      </ul>

      {/* Model Viewer */}
      {selectedModel ? (
        <ModelViewer modelUrl={selectedModel} key={selectedModel} />
      ) : (
        <p>Select a model to view</p>
      )}
    </div>
  );
};

export default App;
