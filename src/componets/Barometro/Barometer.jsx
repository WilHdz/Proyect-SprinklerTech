import React from "react";
import { Chart } from "react-google-charts";

const styles = {
  dial: {
    width: `auto`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px"
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};

const Barometer = ({ id, value, title }) => {
  return (
    <div style={styles.dial}>
      <Chart
        height={120}
        chartType="Gauge"
        loader={<div></div>}
        data={[
          ["Label", "Value"],
          [title, Number(value)]
        ]}
        options={{
          redFrom: 90,
          redTo: 100, // Ajusta según el rango de tu dato
          yellowFrom: 50,
          yellowTo: 90,
          minorTicks: 5,
          min: 0,
          max: 100 // Ajusta según el rango de tu dato
        }}
      />
    </div>
  );
};

export default Barometer;
