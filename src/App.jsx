import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarFooter from "./components/NavbarFooter";
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
        <Route path="/aayusa/3/4/1" element={<NavbarFooter />} />
      </Routes>
    </div>
  );
}

export default App;
