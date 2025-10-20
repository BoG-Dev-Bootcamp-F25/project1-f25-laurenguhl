import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import TrainList from "../components/TrainList";
import "./LinesPage.css";

export default function LinesPage() {
  const { lineColor } = useParams<{ lineColor: string }>();
  const [trainData, setTrainData] = useState<any[]>([]);
  const [stationData, setStationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const trainsRes = await fetch(
          `https://midsem-bootcamp-api.onrender.com/arrivals/${lineColor}`
        );
        const stationsRes = await fetch(
          `https://midsem-bootcamp-api.onrender.com/stations/${lineColor}`
        );

        const trains = await trainsRes.json();
        const stations = await stationsRes.json();

        setTrainData(trains);
        setStationData(stations);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [lineColor]);

  // Clear UI selections when the selected line changes so stale filters don't hide all trains
  useEffect(() => {
    setSelectedStation(null);
    setDirection(null);
    setStatus(null);
  }, [lineColor]);

  if (loading) return <div>Loading...</div>;

  const getLineColor = (line: string) => {
    switch (line) {
      case "gold":
        return "#D4AF37";
      case "red":
        return "#c62828";
      case "green":
        return "#2e7d32";
      case "blue":
        return "#1565c0";
      default:
        return "#333";
    }
  };

  const filteredTrains = trainData.filter((train) => {
    const trainStatus = train.WAITING_TIME === "0 min" ? "Arriving" : "Scheduled";
    
    return (
      (!selectedStation || train.HEAD_SIGN === selectedStation.toUpperCase()) &&
      (!direction || train.DIRECTION === direction) &&
      (!status || trainStatus === status)
    );
  });

  return (
    <div className="lines-page">
      {/* HEADER SECTION */}
      <header className="line-header">
        <nav className="line-nav">
          <div className="line-links">
            {["gold", "red", "green", "blue"].map((line) => (
              <Link
                key={line}
                to={`/lines/${line}`}
                className={`line-button ${line}-line`}
                style={{ backgroundColor: getLineColor(line) }}
              >
                {line.charAt(0).toUpperCase() + line.slice(1)} Line
              </Link>
            ))}
          </div>
        </nav>

        <div className="line-title">
          <h1>{(lineColor ?? "").toUpperCase()} LINE</h1>
        </div>
      </header>

      {/* MAIN SECTION */}
      <div className="lines-main">
        {/* Left column: station list */}
        <div className="station-column">
          <NavBar
            stations={stationData}
            selectedStation={selectedStation}
            onSelectStation={(s) => setSelectedStation(s)}
          />
        </div>

        {/* Right column: filters + train list */}
        <div className="train-column">
          <div className="filters">
            {/* Direction Buttons */}
            {lineColor === "green" || lineColor === "blue" ? (
              <>
                <button 
                  className={direction === "E" ? "active" : ""}
                  onClick={() => setDirection(direction === "E" ? null : "E")}>Eastbound</button>
                <button 
                  className={direction === "W" ? "active" : ""}
                  onClick={() => setDirection(direction === "W" ? null : "W")}>Westbound</button>
              </>
            ) : (
              <>
                <button 
                  className={direction === "N" ? "active" : ""}
                  onClick={() => setDirection(direction === "N" ? null : "N")}>Northbound</button>
                <button 
                  className={direction === "S" ? "active" : ""}
                  onClick={() => setDirection(direction === "S" ? null : "S")}>Southbound</button>
              </>
            )}
            <button 
              className={status === "Arriving" ? "active" : ""}
              onClick={() => setStatus(status === "Arriving" ? null : "Arriving")}>Arriving</button>
            <button 
              className={status === "Scheduled" ? "active" : ""}
              onClick={() => setStatus(status === "Scheduled" ? null : "Scheduled")}>Scheduled</button>
          </div>
          <TrainList trains={filteredTrains} />
        </div>
      </div>
    </div>
  );
}