export default function Train({ train }: { train: any }) {
  const onTime = train.DELAY === "T0S";
  return (
    <div
      style={{
        border: "1px solid gray",
        paddingLeft: "15px",
        borderRadius: "5px",
        marginBottom: "5px",
        display: "flex",
      }}>
      <div>   
        <h3>{train.STATION} --&gt; {train.DESTINATION}</h3>
        <div style={{ display: "flex", gap: "25px" }}>
            <p>Status: {onTime ? "On Time ✅" : "Delayed ⚠️"}</p>
            <p>Waiting Time: {train.WAITING_TIME}</p>
        </div>
      </div>
    </div>
  );
}