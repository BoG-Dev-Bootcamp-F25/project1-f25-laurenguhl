import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">MARTA</h1>
        <nav>
          <Link to="/about" className="about-link">
            About MARTA
          </Link>
        </nav>
      </header>

      <div className="home-main">
        <div className="routes-section">
          <h2>VIEW ROUTES SCHEDULE</h2>
          <div className="route-links">
            <Link to="/lines/gold" className="route-item">
              Gold Line
            </Link>
            <Link to="/lines/red" className="route-item">
              Red Line
            </Link>
            <Link to="/lines/green" className="route-item">
              Green Line
            </Link>
            <Link to="/lines/blue" className="route-item">
              Blue Line
            </Link>
          </div>
        </div>

        <div className="image-section">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/College_Park_MARTA_Station.jpg"
            alt="MARTA train"
          />
        </div>
      </div>
    </div>
  );
}