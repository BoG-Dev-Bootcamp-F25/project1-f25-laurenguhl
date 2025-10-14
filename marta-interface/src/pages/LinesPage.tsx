import React from "react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";

export default function LinesPage() {
  const { lineColor } = useParams<{ lineColor: string }>();
  const [trainData, setTrainData] = useState<any[]>([]);
  const [stationData, setStationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Fetch data when the color changes
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

  // // Apply filters to train data
  // const filteredTrains = trainData.filter((train) => {
  //   let matches = true;

  //   // Filter by selected station
  //   if (selectedStation) {
  //     matches = matches && train.STATION === selectedStation;
  //   }

  //   // Filter by active buttons
  //   activeFilters.forEach((filter) => {
  //     if (filter === "Arriving") matches = matches && train.WAITING_TIME === "Arriving";
  //     if (filter === "Scheduled") matches = matches && train.WAITING_TIME !== "Arriving";
  //     if (filter === "Northbound") matches = matches && train.DIRECTION === "N";
  //     if (filter === "Southbound") matches = matches && train.DIRECTION === "S";
  //     if (filter === "Eastbound") matches = matches && train.DIRECTION === "E";
  //     if (filter === "Westbound") matches = matches && train.DIRECTION === "W";
  //   });

  //   return matches;
  // });

  if (loading) return <div>Loading...</div>;

  return (
    // </div>
    <div className = "flex-container" style = {{display: "flex", gap: "20px", padding: "20px"}}>
      <NavBar stations={stationData} />
      <TrainList trains={trainData} />
    </div>
  );
}