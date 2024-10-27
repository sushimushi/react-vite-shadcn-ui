// Define the shape of the data for each entry
export interface DataEntry {
  date: string; // Format: ISO date string
  orders: number;
  revenue: number;
}

// Define the props for the BarChart component
export interface BarChartProps {
  data: DataEntry[];
}

// Define the shape of the data object
export interface OrderRevenueData {
  date: string; // Format: YYYY-MM-DD
  orders: number;
  revenue: number;
}

// Define the props for the OrderRevenueChart component
export interface OrderRevenueChartProps {
  data: OrderRevenueData[];
  scale: 'datewise' | 'weekwise' | 'monthwise' | 'yearwise'; // Allowed scales
}

export interface OrderRevenueData {
  date: string;      // Date in 'YYYY-MM-DD' format
  orders: number;    // Total number of orders
  revenue: number;   // Total revenue generated
  picked: number;    // Total items picked
  delivered: number; // Total items delivered
}