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

export type scaleType = 'date' | 'week' | 'month' | 'year'; 
export type typeType = 'orders' | 'picked' | 'delivered';
// Define the props for the OrderRevenueChart component
export interface OrderRevenueChartProps {
  data: OrderRevenueData[];
  scale: 'date' | 'week' | 'month' | 'year'; // Allowed scales
  type: 'orders' | 'picked' | 'delivered';
}

export interface OrderRevenueData {
  date: string;               // Date in 'YYYY-MM-DD' format
  orders: number;             // Total number of orders
  revenue: number;            // Total revenue generated
  picked: number;             // Total items picked
  delivered: number;          // Total items delivered
  channel: string;            // Type of channel
  zone: string;               // Type of Zone
  deliveryTimeline: number;   // No of days to deliver
}


// Utility function for generating random integers (used for type reference)
declare function getRandomInt(min: number, max: number): number;

// Define the types for each sub-section

// Highlight Section
export interface Highlight {
  orders: {
    today: number;
    yesterday: number;
  };
  revenue: {
    today: number;
    yesterday: number;
  };
  picked: {
    today: number;
    yesterday: number;
  };
  delivered: {
    today: number;
    yesterday: number;
  };
  rto_oto: {
    today: number;
    yesterday: number;
  };
}

// Shipments Section
export interface Shipments {
  active: number;
  yetToBePicked: number;
  openShipments: number;
  closedShipments: number;
}

// NDR Section
export interface NDR {
  raised: number;
  active: number;
  delivered: number;
  rtoPostNdr: number;
}

// Zone Distribution Section
export interface ZoneDistribution {
  A: number;
  B: number;
  C: number;
  D: number;
  AB?: number;
}

// Delivery Timeline Section
export interface DeliveryTimeline {
  days1to2: number;
  days3to4: number;
  days5: number;
  daysMoreThan5: number;
  avgDays: number;
}

// Channel Distribution Section
export interface ChannelDistribution {
  manual: number;
  shopify: number;
}

// Main Result Type
export interface ResultType {
  highlight: Highlight;
  shipments: Shipments;
  ndr: NDR;
  ordersRevenue: OrderRevenueData[]; // Assuming 'ordersRevenue' is a number; adjust if it's another type.
  zoneDistribution: ZoneDistribution;
  deliveryTimeline: DeliveryTimeline;
  channelDistribution: ChannelDistribution;
}

type HighlightData = {
  today: number;
  yesterday: number;
};

export type HighlightType = {
  orders: HighlightData;
  revenue: HighlightData;
  picked: HighlightData;
  delivered: HighlightData;
  rto_oto: HighlightData;
};