//@ts-nocheck
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }: any) => {
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

        // Calculate the total for percentage calculation
        const total = Object.values(data).reduce((acc: any, value: any) => acc + value, 0);

        // Create a pie layout
        const pie = d3.pie().value((d: any) => d[1]);

        // Create an arc generator for pie slices
        const arc = d3.arc().innerRadius(0).outerRadius(radius - 10);

        // Create a separate arc generator for labels
        const labelArc = d3.arc().innerRadius(radius + 10).outerRadius(radius + 30);

        // Create a group for the pie chart
        const g = svg && svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Draw the pie slices
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

        // Add legends in a horizontal line at the bottom
        const legend = svg.append("g")
            .attr("transform", `translate(0, ${height + 40})`); // Position legends below the chart

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
                .attr("x", 20)
                .attr("y", 10)
                .style("font-size", "12px")
                .text(entry[0]);
        });
    }, [data]);

    return (
        <svg ref={svgRef} width={300} height={350} overflow={'visible'}></svg> // Increased height for legends
    );
};

export default PieChart;
