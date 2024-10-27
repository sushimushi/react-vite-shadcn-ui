import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { AggregatedData, BarChartProps, DataEntry } from '@/models/models';

const aggregateDataByMonth = (data: DataEntry[]): AggregatedData[] => {
    const aggregated: { [key: string]: AggregatedData } = {};

    data.forEach(({ date, orders, revenue }) => {
        const month = d3.timeMonth(new Date(date)).toISOString();
        if (!aggregated[month]) {
            aggregated[month] = { date: month, orders: 0, revenue: 0 };
        }
        aggregated[month].orders += orders;
        aggregated[month].revenue += revenue;
    });

    return Object.values(aggregated);
};

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!data || data.length === 0) return; // Check for empty data

        const aggregatedData = aggregateDataByMonth(data);
        const svg = d3.select(svgRef.current);
        const parentWidth = svgRef.current?.parentElement?.getBoundingClientRect().width || 800;
        const height = 400; // Static height, adjust as necessary

        svg.attr('width', parentWidth).attr('height', height);
        svg.selectAll('*').remove();

        const minBarWidth = 50;
        const numBars = aggregatedData.length;
        const totalBarWidth = Math.max(numBars * minBarWidth, parentWidth);

        const xScale = d3.scaleBand()
            .domain(aggregatedData.map(d => d.date))
            .range([0, totalBarWidth])
            .padding(0.1);

        const yScaleOrders = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => d.orders) || 0])
            .range([height, 0]);

        const yScaleRevenue = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => d.revenue) || 0])
            .range([height, 0]);

        // Create bars for orders
        svg.selectAll('.bar')
            .data(aggregatedData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.date) ?? 0)
            .attr('y', d => yScaleOrders(d.orders))
            .attr('width', Math.max(minBarWidth, xScale.bandwidth()))
            .attr('height', d => height - yScaleOrders(d.orders))
            .attr('fill', 'steelblue')
            .on('mouseover', (event, d) => {
                const tooltip = d3.select('#tooltip');
                tooltip.transition().duration(200).style('opacity', .9);
                tooltip.html(`Orders: ${d.orders}<br>Revenue: ${d.revenue}`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                d3.select('#tooltip').transition().duration(500).style('opacity', 0);
            });

        // Add y-axis for orders
        const yAxisOrdersGroup = svg.append('g')
            .attr('class', 'y-axis-orders')
            .call(d3.axisLeft(yScaleOrders));

        // Add y-axis label for orders
        svg.append('text')
            .attr('class', 'axis-label')
            .attr('x', -height / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text('Orders');

        // Create dots for revenue
        svg.selectAll('.dot')
            .data(aggregatedData)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => {
                const barX = xScale(d.date) ?? 0;
                return barX + xScale.bandwidth() / 2;
            })
            .attr('cy', d => yScaleRevenue(d.revenue))
            .attr('r', 5)
            .attr('fill', 'orange');

        // Add y-axis for revenue
        const yAxisRevenueGroup = svg.append('g')
            .attr('transform', `translate(${parentWidth - 50}, 0)`) // Adjust position as needed
            .attr('class', 'y-axis-revenue')
            .call(d3.axisRight(yScaleRevenue));

        // Add revenue y-axis label
        svg.append('text')
            .attr('class', 'axis-label')
            .attr('x', parentWidth - 80) // Adjust position as needed
            .attr('y', 20) // Adjust position as needed
            .attr('text-anchor', 'end')
            .text('Revenue')
            .attr('fill', 'orange');

        // Add x-axis
        const xAxisGroup = svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).tickFormat((dateString: string) => {
                const date = new Date(dateString);
                return d3.timeFormat('%b %Y')(date);
            }));

        // Add x-axis label
        svg.append('text')
            .attr('class', 'axis-label')
            .attr('x', parentWidth / 2)
            .attr('y', height + 30)
            .attr('text-anchor', 'middle')
            .text('Date');

        // Add revenue values above each bar
        svg.selectAll('.revenue-label')
            .data(aggregatedData)
            .enter()
            .append('text')
            .attr('class', 'revenue-label')
            .attr('x', d => xScale(d.date) ?? 0 + xScale.bandwidth() / 2)
            .attr('y', d => yScaleOrders(d.orders) - 5) // Position above the bars
            .attr('text-anchor', 'middle')
            .text(d => d.revenue.toFixed(2)); // Display revenue values

        // Connect the dots with lines for revenue
        const line = d3.line<DataEntry>()
            .x((d) => {
                const barX = xScale(d.date) ?? 0;
                return barX + xScale.bandwidth() / 2;
            })
            .y((d) => yScaleRevenue(d.revenue))
            .defined((d) => d.revenue > 0); // Only connect if revenue is greater than 0

        // Append the line to the SVG
        svg.append('path')
            .datum(aggregatedData)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'orange')
            .attr('stroke-width', 2)
            .attr('d', line);
    }, [data]);

    return (
        <div className="overflow-x-auto">
            <svg className="block" ref={svgRef} width={'100%'}></svg>
            <div id="tooltip" style={{ position: 'absolute', opacity: 0, background: 'white', border: '1px solid gray', padding: '5px', borderRadius: '3px' }} />
        </div>
    );
};
