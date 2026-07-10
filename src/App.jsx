import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import ScrollToTop from "./components/ScrollToTop";
import MusicPlayer from "./components/MusicPlayer";
import PasswordGate from "./components/PasswordGate";

function App() {
  return (
    <div className="bg-slate-950 text-slate-100 antialiased">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <PasswordGate>
              <MusicPlayer />
              <Home />
            </PasswordGate>
          }
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/garden/hidden-bloom-0431" element={<Upload />} />
        <Route
          path="*"
          element={
            <PasswordGate>
              <MusicPlayer />
              <Home />
            </PasswordGate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
