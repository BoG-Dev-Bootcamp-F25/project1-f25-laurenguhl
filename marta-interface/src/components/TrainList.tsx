import Train from "./Train";

export default function TrainList({ trains }: { trains: any[] }) {
  if (trains.length === 0) {
    return <div>No Current Trains Match Filters</div>;
  }

  return (
    <div>
      {trains.map((train, index) => (
        <Train key={index} train={train} />
      ))}
    </div>
  );
}