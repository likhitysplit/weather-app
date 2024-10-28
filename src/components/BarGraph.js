import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarGraph = ({ weatherData }) => {
    const weatherGraph = useRef();

    useEffect(() => {
        if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return;

        const data = weatherData.forecast.forecastday.map(day => ({
            date: day.date,
            temp: day.day.avgtemp_f
        }));

        const width = 600;
        const height = 400;

        d3.select(weatherGraph.current).selectAll('*').remove();

        const svg = d3.select(weatherGraph.current)
            .attr('width', width + 100)
            .attr('height', height + 100);

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.date))
            .range([0, width - 40])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.temp)]) 
            .range([height - 40, 0]);

        const dayAxis = d3.axisBottom(xScale);
        const tempAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', 'translate(40, 395)')
            .call(dayAxis)
            .selectAll("text")
            .style('fill');  

        svg.append('g')
            .attr('transform', 'translate(40, 30)')
            .call(tempAxis)
            .selectAll("text")
            .style('fill', '#8EACCD');  

        const bars = svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.date) + 40)
            .attr('y', height - 10)  
            .attr('width', xScale.bandwidth())
            .attr('height', 0)  
            .attr('fill', '#86AB89');

        bars.transition()
            .duration(1000)  
            .attr('y', d => yScale(d.temp) + 30) 
            .attr('height', d => height - 40 - yScale(d.temp));  
    }, [weatherData]);

    return (
        <svg ref={weatherGraph}></svg>
    );
};

export default BarGraph;
