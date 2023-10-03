import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "../src/components/Home"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
