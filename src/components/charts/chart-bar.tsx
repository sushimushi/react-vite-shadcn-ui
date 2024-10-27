import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const OrderRevenueChart = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  // Chart dimensions
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const containerWidth = containerRef.current.offsetWidth; // Get the container's width
    const width = Math.max(containerWidth, data.length * 20); // Set width to either container width or based on data length

    // Set the SVG dimensions
    svg.attr('width', width).attr('height', height);

    // Create scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const yOrders = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.orders)]).nice()
        .range([height - margin.bottom, margin.top]);

    const yRevenue = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)]).nice()
        .range([height - margin.bottom, margin.top]);

    // Clear previous chart
    svg.selectAll('*').remove();

    // Draw bars for orders
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.date))
        .attr('y', d => yOrders(d.orders))
        .attr('height', d => yOrders(0) - yOrders(d.orders))
        .attr('width', x.bandwidth())
        .attr('fill', 'steelblue');

    // Draw dots for revenue (only if revenue > 0)
    const filteredData = data.filter(d => d.revenue > 0);

    svg.selectAll('.dot')
        .data(filteredData)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.date) + x.bandwidth() / 2)
        .attr('cy', d => yRevenue(d.revenue))
        .attr('r', d => '0.3rem')
        .attr('fill', 'orange');

      // Split data into segments based on missing revenue (revenue === 0)
      const lineSegments = [];
      let currentSegment = [];
  
      data.forEach((d) => {
          if (d.revenue > 0) {
              currentSegment.push(d); // Add to current segment if revenue exists
          } else if (currentSegment.length > 0) {
              lineSegments.push(currentSegment); // Push current segment when revenue is missing
              currentSegment = []; // Start new segment
          }
      });
  
      // If there's any remaining segment at the end, push it to the segments array
      if (currentSegment.length > 0) {
          lineSegments.push(currentSegment);
      }
  
      // Draw lines for each segment of continuous data
      const line = d3.line()
          .x(d => x(d.date) + x.bandwidth() / 2)
          .y(d => yRevenue(d.revenue));

          lineSegments.forEach(segment => {
            svg.append('path')
                .datum(segment) // Only draw the path for the current segment
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('stroke', 'orange')
                .attr('stroke-width', 2)
                .attr('d', line);
        });

    // X-axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(d => d3.timeFormat('%d %b %y')(new Date(d))));

    // Y-left axis for orders
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yOrders));

    // Y-right axis for revenue
    svg.append('g')
        .attr('transform', `translate(${width - margin.right},0)`)
        .call(d3.axisRight(yRevenue));

}, [data]);


  return (
    <div ref={containerRef} style={{ overflowX: 'auto' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};
