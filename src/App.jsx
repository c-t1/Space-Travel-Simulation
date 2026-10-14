import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Spacecrafts from "./pages/Spacecrafts.jsx";
import Spacecraft from "./pages/Spacecraft.jsx";
import BuildSpacecraft from "./pages/BuildSpacecraft.jsx";
import Planets from "./pages/Planets.jsx";
import Header from "./components/Header.jsx";

function App () {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/spacecrafts" element={<Spacecrafts />} />
                <Route path="/spacecrafts/new" element={<BuildSpacecraft />} />
                <Route path="/spacecrafts/:id" element={<Spacecraft />} />
                <Route path="/planets" element={<Planets />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );}

export default App;