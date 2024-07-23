import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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
  }, [distance]);

  return (
    <div>
      <div id="main2" ref={chartRef} style={{ width: 600, height: 400 }}></div>
    </div>
  );
};

export default EChartComponent;
