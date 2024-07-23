import React from "react";
import EChartComponent from "../componets/LineChart/LineChart";
import Barometer from "../componets/Barometro/Barometer";
import Temp from "../componets/Temperature/Temp";
import socket from '../conection/websocke'; // Asegúrate de importar el WebSocket

export default class IndexClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      humidity: "0", // Humedad del aire
      temperature: "0", // Temperatura del aire
      soilHumidity: "0", // Humedad del suelo
      distance: "0", // Distancia
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);

    socket.onmessageParsed = (data) => {
      this.setState({
        humidity: data.humidity || "0",
        temperature: data.temperature || "0",
        soilHumidity: data.soilHumidity || "0",
        distance: data.distance || "0",
      });
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="App">
        <div className="dials">
          Humedad del aire:
          <input
            type="text"
            value={this.state.humidity}
            onChange={(e) => this.setState({ humidity: e.currentTarget.value })}
          />
          Temperatura del aire: 
          <input
            type="text"
            value={this.state.temperature}
            onChange={(e) => this.setState({ temperature: e.currentTarget.value })}
          />
          Humedad del suelo:
          <input
            type="text"
            value={this.state.soilHumidity}
            onChange={(e) => this.setState({ soilHumidity: e.currentTarget.value })}
          />
        </div>
        <div className="dials">
          <Barometer id="dial9" value={this.state.humidity} title="Air Humidity" />
          <Temp id="dial7" value={this.state.temperature} title="Air Temperature" />
        </div>
        <div className="dials">
          <Temp id="dial8" value={this.state.soilHumidity} title="Soil Humidity" />
          <EChartComponent distance={this.state.distance} />
        </div>
      </div>
    );
  }
}
