import React from "react";
import EChartComponent from "../componets/LineChart/LineChart";
import Barometer from "../componets/Barometro/Barometer";
import Temp from "../componets/Temperature/Temp";

let incoming = {
  date: 1597107474849,
  data: {
    pitch: "0",
    roll: "0",
    yaw: "0",
    vgx: "0",
    vgy: "0",
    vgz: "-8",
    templ: "66",
    temph: "69",
    tof: "30",
    h: "20",
    bat: "90",
    baro: "172.62",
    time: "0",
    agx: "-12.00",
    agy: "-8.00",
    agz: "-980.00",
    location: "32.942690,-96.994845"
  },
  type: "toy",
  drone_id: "drone1"
};

export default class IndexClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      battery: incoming.data.bat,
      baro: incoming.data.baro,
      pitch: incoming.data.pitch,
      roll: incoming.data.roll,
      yaw: incoming.data.yaw,
      vgx: incoming.data.vgx,
      vgy: incoming.data.vgy,
      vgz: incoming.data.vgz,
      agx: incoming.data.agx,
      agy: incoming.data.agy,
      agz: incoming.data.agz,
      templ: incoming.data.templ,
      temph: incoming.data.temph,
      location: incoming.data.location
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
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
        Barómetro:
          <input
            type="text"
            value={this.state.baro}
            onChange={(e) => this.setState({ baro: e.currentTarget.value })}
          />
          Temperatura más baja: 
          <input
            type="text"
            value={this.state.templ}
            onChange={(e) => this.setState({ templ: e.currentTarget.value })}
          />
          Temperatura más alta:
          <input
            type="text"
            value={this.state.temph}
            onChange={(e) => this.setState({ temph: e.currentTarget.value })}
          />
      
    
        </div>
        <div className="dials">
          <Barometer id="dial9" value={this.state.baro} title="Barometer" />
          <Temp id="dial7" value={this.state.templ} title="Lowest Temp" />
        </div>
        <div className="dials">
        <Temp id="dial8" value={this.state.temph} title="Highest Temp" />
        <EChartComponent/>
        </div>
      </div>
    );
  }
}
