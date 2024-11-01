//@ts-nocheck
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ArcChart = ({ data }: any) => {
    const svgRef = useRef();

    useEffect(() => {
        let svg;
        if (svgRef.current) {
            svg = d3.select(svgRef.current);
        }
        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        // Clear previous content
        svg && svg.selectAll('*').remove();

        // Create a color scale
        const color = d3.scaleOrdinal(d3.schemeSet3);

        // Calculate the total and average for percentage calculation
        const total = Object.values(data).reduce((acc: any, value: any) => acc + value, 0);
        const average = total / Object.keys(data).length;

        // Create a pie layout
        const pie = d3.pie().value((d: any) => d[1]);

        // Create an arc generator with an inner radius for the donut effect
        const arc = d3.arc().innerRadius(radius / 2).outerRadius(radius - 10);

        // Create a separate arc generator for labels outside the chart
        const labelArc = d3.arc().innerRadius(radius + 20).outerRadius(radius + 30);

        // Create a group for the arc chart
        const g = svg && svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Draw the arc slices
        g && g.selectAll('.slice')
            .data(pie(Object.entries(data) as any))
            .enter()
            .append('g')
            .attr('class', 'slice')
            .append('path')
            .attr('d', arc as any)
            .attr('fill', (d, i) => color(i));

        // Add labels with two lines outside the chart
        const slices = g.selectAll('.slice');

        // First line with label name
        slices.append('text')
            .attr('transform', d => `translate(${labelArc.centroid(d)})`)
            .attr('dy', '-0.5em')
            .style('font-size', '10px')
            .style('text-anchor', d => (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : 'start')
            .text(d => d.data[0]);

        // Second line with count and percentage
        slices.append('text')
            .attr('transform', d => `translate(${labelArc.centroid(d)})`)
            .attr('dy', '0.8em')
            .style('font-size', '10px')
            .style('text-anchor', d => (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : 'start')
            .text(d => {
                const count = d.data[1];
                const percentage = ((count / total) * 100).toFixed(1);
                return `${count} (${percentage}%)`;
            });

        // Add average in the center of the chart using tspan for multiple lines
        const averageText = svg.append('text')
            .attr('x', width / 2)
            .attr('y', height / 2)
            .attr('text-anchor', 'middle'); // Center align the text

        // First line for "Avg:"
        averageText.append('tspan')
            .attr('dy', '-0.5em') 
            .style('font-size', '18px')
            .style('font-weight', 'bold')
            .text(`${average.toFixed(1)}`);           
            
            // Second line for average value
            averageText.append('tspan')
            .attr('dy', '1.2em') 
            .attr('dx', '-3.2rem') 
            .style('font-weight', '600')
            .style('font-size', '14px')
            .text('Avg. Days');

        // Add legends in a horizontal line at the bottom
        const legend = svg.append("g")
            .attr("transform", `translate(0, ${height + 30})`); // Position legends below the chart

        const legendSpacing = 80; // Space between each legend item
        Object.entries(data).forEach((entry, i) => {
            const legendItem = legend.append("g")
                .attr("transform", `translate(${i * legendSpacing}, 0)`); // Horizontally position each item

            // Legend color box
            legendItem.append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", color(i));

            // Legend text
            legendItem.append("text")
                .attr("x", 15)
                .attr("y", 10)
                .style("font-size", "10px")
                .text(entry[0]);
        });
    }, [data]);

    return (
        <svg ref={svgRef} width={300} height={350} overflow={'visible'}></svg> // Increased height for legends
    );
};

export default ArcChart;
