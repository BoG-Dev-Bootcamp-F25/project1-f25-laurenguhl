type NavBarProps = {
  stations: any[];
  selectedStation?: string | null;
  onSelectStation?: (station: string | null) => void;
};

export default function NavBar({ stations, selectedStation, onSelectStation }: NavBarProps) {
  if (!stations || stations.length === 0) {
    return <div>No Current Stations found</div>;
  }

  const getStationLabel = (station: any) => {
    if (!station) return "Unknown";
    if (typeof station === "string") return station;
    return station.STATION || station.station || station.name || JSON.stringify(station);
  };

  const handleClick = (stationLabel: string) => {
    if (!onSelectStation) return;
    if (selectedStation === stationLabel) onSelectStation(null);
    else onSelectStation(stationLabel);
  };

  return (
    <div className="navbar" style={{ border: "1px solid gray", padding: "10px", borderRadius: "5px", minWidth: "180px", maxWidth: "260px" }}>
      <h4 style={{ marginTop: 0, marginBottom: 8 }}>Stations</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {stations.map((station, index) => {
          const label = getStationLabel(station);
          const active = selectedStation === label;
          return (
            <button
              key={index}
              onClick={() => handleClick(label)}
              style={{
                textAlign: "left",
                padding: "6px 8px",
                borderRadius: 4,
                background: active ? "#4e4e4e" : "white",
                color: active ? "white": "black",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}