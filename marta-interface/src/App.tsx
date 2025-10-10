import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LinesPage from "./pages/LinesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lines/:lineColor" element={<LinesPage />} />
        <Route path="/lines" element={<LinesPage />} />
      </Routes>
    </BrowserRouter>
  );
}