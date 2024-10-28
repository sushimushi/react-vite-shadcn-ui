import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { OrderRevenueChartProps, OrderRevenueData } from '@/models/models'

const aggregateData = (data: OrderRevenueData[], scale: 'date' | 'week' | 'month' | 'year') => {
    const aggregated: { [key: string]: { date: string; orders: number; revenue: number, picked: number, delivered: number } } = {};

    data.forEach(({ date, orders, revenue, picked, delivered }) => {
        let key: string;
        const d = new Date(date);

        if (scale === 'date') {
            key = d3.timeFormat('%Y-%m-%d')(d); // Aggregated by day
        } else if (scale === 'week') {
            key = d3.timeFormat('%Y-%U')(d); // Aggregated by week (year + week number)
        } else if (scale === 'month') {
            key = d3.timeFormat('%Y-%m')(d); // Aggregated by month
        } else {
            key = d3.timeFormat('%Y')(d); // Aggregated by year
        }

        if (!aggregated[key]) {
            aggregated[key] = { date: key, orders: 0, revenue: 0, delivered: 0, picked: 0 };
        }
        aggregated[key].orders += orders;
        aggregated[key].revenue += revenue;
        aggregated[key].delivered += delivered;
        aggregated[key].picked += picked;
    });
    console.log(aggregated)
    return Object.values(aggregated);
};

export const OrderRevenueChart: React.FC<OrderRevenueChartProps> = ({ data, scale, type }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    // Chart dimensions
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const noOfTicks = 5;

    // Aggregate data based on the selected scale
    const aggregatedData = aggregateData(data, scale);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const containerWidth = containerRef.current?.offsetWidth || 0; // Get the container's width
        const width = Math.max(containerWidth, aggregatedData.length * 20); // Set width to either container width or based on data length

        // Set the SVG dimensions
        svg.attr('width', width).attr('height', height);

        // Create scales
        const x = d3.scaleBand()
            .domain(aggregatedData.map(d => d.date))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const yOrders = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => d.orders) || 0]).nice()
            .range([height - margin.bottom, margin.top]);

        const yRevenue = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => d.revenue) || 0]).nice()
            .range([height - margin.bottom, margin.top]);

        // Clear previous chart
        svg.selectAll('*').remove();

        // Create a tooltip div
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('background', 'white')
            .style('border', '1px solid lightgray')
            .style('border-radius', '5px')
            .style('padding', '5px');

        // Add horizontal grid lines for y-axis behind bars and dots
        svg.append('g')
            .attr('class', 'grid')
            .selectAll('line')
            .data(yOrders.ticks(noOfTicks)) // Generate 5 grid lines
            .enter()
            .append('line')
            .attr('x1', margin.left) // Start line at left margin
            .attr('x2', width - margin.right) // End line at right margin
            .attr('y1', d => yOrders(d)) // Y position based on tick value
            .attr('y2', d => yOrders(d)) // Y position based on tick value
            .attr('stroke', 'lightgray') // Line color
            .attr('stroke-dasharray', '2,2'); // Dotted line style (optional)

        // Draw bars for orders
        svg.selectAll('.bar')
            .data(aggregatedData)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.date) || 0)
            .attr('y', d => yOrders(d[type]))
            .attr('height', d => yOrders(0) - yOrders(d[type]))
            .attr('width', x.bandwidth())
            .attr('fill', 'steelblue')
            .attr('rx', 5) // Set the radius for rounded corners
            .attr('ry', 5)
            .on('mouseover', (event, d) => {
                tooltip.transition().duration(200).style('opacity', 1);
                tooltip.html(`Date: ${d.date}<br/>${type}: ${d[type]}`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px')
                    .style('text-transform', 'capitalize');
              })
              .on('mouseout', () => {
                tooltip.transition().duration(500).style('opacity', 0);
              });; // Set the radius for rounded corners;

        // Draw dots for revenue (only if revenue > 0)
        const filteredData = aggregatedData.filter(d => d.revenue > 0);

        svg.selectAll('.dot')
            .data(filteredData)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d.date) + x.bandwidth() / 2)
            .attr('cy', d => yRevenue(d.revenue))
            .attr('r', '0.3rem')
            .attr('fill', 'orange')
            .on('mouseover', (event, d) => {
                tooltip.transition().duration(200).style('opacity', 1);
                tooltip.html(`Date: ${d.date}<br/>Revenue: ${d.revenue}`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
              })
              .on('mouseout', () => {
                tooltip.transition().duration(500).style('opacity', 0);
              });

        // Split data into segments based on missing revenue (revenue === 0)
        const lineSegments: OrderRevenueData[][] = [];
        let currentSegment: OrderRevenueData[] = [];

        aggregatedData.forEach((d: OrderRevenueData) => {
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
        const line = d3.line<OrderRevenueData>()
            .x(d => x(d.date)+ x.bandwidth() / 2)
            .y(d => yRevenue(d.revenue))
            .curve(d3.curveMonotoneX);

        lineSegments.forEach(segment => {
            svg.append('path')
                .datum(segment) // Only draw the path for the current segment
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('stroke', 'orange')
                .attr('stroke-width', 2)
                .attr('d', line);
        });

        // X-axis without domain line
        const xAxisGroup = svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`);
        xAxisGroup.call(d3.axisBottom(x).tickFormat(d => {
            // Format the tick labels based on the scale
            const date = new Date(d);
            if (scale === 'date') {
                return d3.timeFormat('%d %b %y')(date);
            } else if (scale === 'week') {
                return `Week ${d.split('-')[1]} of ${d.split('-')[0]}`;
            } else if (scale === 'month') {
                return d3.timeFormat('%b %Y')(date);
            } else {
                return d3.timeFormat('%Y')(date);
            }
        }));
        xAxisGroup.select('.domain').remove(); // Remove the domain line
        xAxisGroup.selectAll('line').remove(); // Remove all tick lines
        xAxisGroup.selectAll('text').attr('transform', 'rotate(-45)');
        xAxisGroup.selectAll('text').attr('dx', -10);
        xAxisGroup.selectAll('text').attr('dy', -5);

        // Y-left axis for orders without domain line
        const yAxisLeftGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yOrders).ticks(noOfTicks).tickFormat(d => d >= 1000 ? `${d / 1000}k` : d), 0);
        yAxisLeftGroup.select('.domain').remove(); // Remove the domain line
        yAxisLeftGroup.selectAll('line').remove();

        // Y-right axis for revenue without domain line
        const yAxisRightGroup = svg.append('g')
            .attr('transform', `translate(${width - margin.right},0)`)
            .call(d3.axisRight(yRevenue).ticks(noOfTicks).tickFormat(d => d >= 1000 ? `${d / 1000}k` : d), 0);
        yAxisRightGroup.select('.domain').remove(); // Remove the domain line
        yAxisRightGroup.selectAll('line').remove(); // Remove all tick lines

    }, [aggregatedData, data, scale, type]);

    return (
        <div ref={containerRef} style={{ overflowX: 'auto' }}>
            <svg ref={svgRef}></svg>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <div style={{ display: 'inline-block', marginRight: '20px' }}>
                    <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'steelblue', marginRight: '5px' }}></span>
                    Orders
                </div>
                <div style={{ display: 'inline-block' }}>
                    <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'orange', marginRight: '5px' }}></span>
                    Revenue
                </div>
            </div>
        </div>
    );
};
