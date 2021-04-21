import React from "react";
import "./ProgressBar.scss";

export function ProgressBar(props: { value: number; max: number }) {
  const { value, max } = props;

  return (
    <div className="progress-wrapper">
      <div
        className="progress"
        style={{
          width: +(value / max).toFixed(2) * 100 + "%",
        }}
      ></div>
    </div>
  );
}
