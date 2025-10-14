export default function NavBar({ stations }: { stations: string[] }) {
  if (stations.length === 0) {
    return <div>No Current Stations found</div>;
  }

  return (
    <div className="navbar" style={{ border: "1px solid gray", padding: "10px", borderRadius: "5px"}}>
        <ol>
        {stations.map((station, index) => (
          <li key={index}>{station}</li>
        ))}
        </ol>
    </div>
  );
}