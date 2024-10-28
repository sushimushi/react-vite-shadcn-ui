import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        // Clear previous content
        svg.selectAll('*').remove();

        // Create a color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Create a pie layout
        const pie = d3.pie().value(d => d[1]); // Use the second element of the entries (value)
        
        // Create an arc generator
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius - 10);

        // Create a group for the pie chart
        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Draw the pie slices
        g.selectAll('.slice')
            .data(pie(Object.entries(data))) // Use Object.entries() to convert the data
            .enter()
            .append('g')
            .attr('class', 'slice')
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i));

        // Add labels
        g.selectAll('.slice')
            .append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '.35em')
            .text(d => d.data[0]); // Use the first element of the entries (key)
    }, [data]);

    return (
        <svg ref={svgRef} width={300} height={300}></svg>
    );
};

export default PieChart;
