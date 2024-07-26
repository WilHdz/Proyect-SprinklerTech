  import React, { useEffect, useRef } from 'react';
  import * as echarts from 'echarts/core';
  import { GridComponent } from 'echarts/components';
  import { LineChart } from 'echarts/charts';
  import { UniversalTransition } from 'echarts/features';
  import { CanvasRenderer } from 'echarts/renderers';
  import '../../componets/LineChart/Grafica.css'

  echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

  const EChartComponent = ({ distance }) => {
    const chartRef = useRef(null);
    const myChartRef = useRef(null);
  
    useEffect(() => {
      if (chartRef.current) {
        myChartRef.current = echarts.init(chartRef.current);
  
        const option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, Number(distance)],
              type: 'line'
            }
          ]
        };
  
        myChartRef.current.setOption(option);
      }
  
       return () => {
        if (myChartRef.current) {
          myChartRef.current.dispose();
        }
      };
    }, [distance]);
  
    return (
      <div className="chart-container">
        <div id="main2" ref={chartRef}></div>
      </div>
    );
  };
  
  export default EChartComponent;