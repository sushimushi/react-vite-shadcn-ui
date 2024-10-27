// Define the shape of the data for each entry
export interface DataEntry {
  date: string; // Format: ISO date string
  orders: number;
  revenue: number;
}

// Define the shape of the aggregated data
export interface AggregatedData {
  date: string; // Format: ISO date string
  orders: number;
  revenue: number;
}

// Define the props for the BarChart component
export interface BarChartProps {
  data: DataEntry[];
}