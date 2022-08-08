import React, { useState } from "react";
import * as Components from "./lib.js";
import BanFanRadarContainer from "./components/BanFanRadarContainer";
// import BggSearchInput from "bgbf-bgg-search";

// ?id=4DcP0jS4KgeA0jbacbd0W1
function App() {
  const [isChoiseGame, setIsChoiseGame] = useState(false);
  return (
    <div className="App">
      <BanFanRadarContainer />
    </div>
  );
}

export default App;
