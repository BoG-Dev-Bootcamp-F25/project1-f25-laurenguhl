import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="about-title">MARTA</h1>
        <nav>
          <Link to="/" className="home-link">
            Back to Home
          </Link>
        </nav>
      </header>

      <div className="about-main">
        <div className="about-section">
          <p>MARTA stands for the Metropolitan Atlanta Rapid Transit Authority, which is the public transportation system for Atlanta, Georgia, providing heavy rail, streetcar, bus, and advance reservation paratransit services. It includes 48 miles of rail, a 2.7-mile streetcar line, and extensive bus routes covering Atlanta and parts of the metropolitan area. MARTA offers a convenient and affordable way to get around the city, with a single trip fare covering both bus and train travel.</p>
        </div>
        <div className="image-section">
          <img
            src="https://itsmarta.com/uploadedimages/train-stations-map-2020.jpg"
            alt="MARTA map"
          />
        </div>
      </div>
    </div>
  );
}