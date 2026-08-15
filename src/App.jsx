import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import ScrollToTop from "./components/ScrollToTop";
import MusicPlayer from "./components/MusicPlayer";
import PasswordGate from "./components/PasswordGate";
import FeelingGate from "./components/FeelingGate";
import SomethingToTellYou from "./components/birthday/SomethingToTellYou";
import HappyBirthday from "./pages/HappyBirthday";
import CountdownPage from "./pages/birthday/CountdownPage";
import MissPage from "./pages/birthday/MissPage";

function App() {
  return (
    <div className="bg-slate-950 text-slate-100 antialiased">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <PasswordGate>
              <div className="bg-white text-gray-900 antialiased">
                <MusicPlayer />
                <Home />
              </div>
            </PasswordGate>
          }
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/feelings" element={<FeelingGate autoFocusInput />} />
        <Route path="/happybirthday/ankita" element={<HappyBirthday />} />
        <Route path="/happybirthday/ankita/miss" element={<MissPage />} />
        <Route path="/test" element={<MissPage />} />
        <Route path="/test2" element={<SomethingToTellYou />} />
        <Route path="/something-to-tell-you" element={<SomethingToTellYou />} />
        <Route path="/happybirthday" element={<CountdownPage />} />
        <Route path="/garden/hidden-bloom-0431" element={<Upload />} />
        <Route
          path="*"
          element={
            <PasswordGate>
              <div className="bg-white text-gray-900 antialiased">
                <MusicPlayer />
                <Home />
              </div>
            </PasswordGate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
