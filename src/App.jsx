import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="bg-white text-gray-900 antialiased">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MusicPlayer />
              <Home />
            </>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
