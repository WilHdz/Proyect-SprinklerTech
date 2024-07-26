import React from "react";
import EChartComponent from "../componets/LineChart/LineChart";
import Barometer from "../componets/Barometro/Barometer";
import Temp from "../componets/Temperature/Temp";
import socket from '../conection/websocke';  
import axios from 'axios';
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

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.setState({
        humidity: data.humidity || "0",
        temperature: data.temperature || "0",
        soilHumidity: data.soilHumidity || "0",
        distance: data.distance || "0",
      }, () => {
        // Check conditions and trigger events
        this.checkConditions();
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

  async triggerPumpEvent(message) {
    try {
      const timestamp = new Date().toISOString();
      await axios.post('http://localhost:3000/events', {
        timestamp,
        distance: this.state.distance,
        soilHumidity: this.state.soilHumidity,
        mensaje: message // Add the message to the event
      });
      console.log('Evento creado:', message);
    } catch (error) {
      console.error('Error creando el evento:', error.response ? error.response.data : error.message);
    }
  }

  checkConditions() {
    const soilHumidityValue = parseInt(this.state.soilHumidity, 10);
    const distanceValue = parseInt(this.state.distance, 10);

    if (soilHumidityValue <= 4000) {
      this.triggerPumpEvent('Bomba 1 encendida'); // Trigger the first pump
    }

    if (distanceValue >= 25) {
      this.triggerPumpEvent('Bomba 2 encendida'); // Trigger the second pump
    }
  }

  render() {
    return (
      <div className="Main-component-data">
        <div className="App">
          <div className="dials">
            <label>
              Humedad del aire:
              <input
                type="text"
                value={this.state.humidity}
                onChange={(e) => this.setState({ humidity: e.currentTarget.value })}
              />
            </label>
            <label>
              Temperatura del aire:
              <input
                type="text"
                value={this.state.temperature}
                onChange={(e) => this.setState({ temperature: e.currentTarget.value })}
              />
            </label>
            <label>
              Humedad del suelo:
              <input
                type="text"
                value={this.state.soilHumidity}
                onChange={(e) => this.setState({ soilHumidity: e.currentTarget.value })}
              />
            </label>
          </div>
          <div className="dials">
            <Temp id="dials" value={this.state.soilHumidity} title="Soil Humidity" />
            <Temp id="dial7" value={this.state.temperature} title="Air Temperature" />
          </div>
          <div className="dials">
            <Barometer id="dial9" value={this.state.humidity} title="Air Humidity" />
            <div style={{ width: '100%', maxWidth: '600px', height: '300px' }}>
              <EChartComponent distance={this.state.distance} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}