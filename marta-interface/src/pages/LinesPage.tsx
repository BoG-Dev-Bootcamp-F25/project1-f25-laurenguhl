import React from "react";
import { Link } from "react-router-dom";

export default function LinesPage() {
    return (
    <div style={{ padding: 20 }}>
      <h1>This is the LinesPage</h1>
      <div style={{ marginTop: 12 }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}