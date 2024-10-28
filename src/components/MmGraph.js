import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const MmGraph = ({ weatherData }) => {
    const mmGraph = useRef();

    useEffect(() => {
        if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return;

        const data = weatherData.forecast.forecastday.map(day => ({
            date: day.date,
            precipitation: day.day.totalprecip_mm
        }));

        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 70, left: 50 }; 

        d3.select(mmGraph.current).selectAll('*').remove();

        const svg = d3.select(mmGraph.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`); 

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.date))
            .range([0, width - 40])

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.precipitation)])
            .range([height, 0]);

        const dayAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(dayAxis)
            .selectAll("text")
            .style('fill', '#000000')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g')
            .call(yAxis)
            .selectAll("text")
            .style('fill', '#8EACCD');

        const line = d3.line()
            .x(d => xScale(d.date) + xScale.bandwidth() / 2)  
            .y(d => yScale(d.precipitation));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#86AB89')
            .attr('stroke-width', 2)
            .attr('d', line)
            .attr('stroke-dasharray', function() { return this.getTotalLength(); })
            .attr('stroke-dashoffset', function() { return this.getTotalLength(); })
            .transition()
            .duration(2000)
            .attr('stroke-dashoffset', 0);

        svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => xScale(d.date) + xScale.bandwidth() / 2)
            .attr('cy', d => yScale(d.precipitation))
            .attr('r', 5)
            .attr('fill', '#5F6F65');
        

    }, [weatherData]);

    return (
        <svg ref={mmGraph}></svg>
    );
};

export default MmGraph;
