import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
interface OrderData {
  date: string;     // Date in 'YYYY-MM-DD' format
  orders: number;   // Number of orders
  revenue: number;  // Revenue as a float
  picked: number;   // Picked as a float
  delivered: number // Deliveredd as a float
}


export const sectionTwoData = {
  shipping: {
    total: { desc: "Lorem Ipsum to use as filler text", title: "Active Shipments", value: 10 },
    yetToBePicked: { desc: "Lorem Ipsum to use as filler text", title: "Yet to be Picked", value: 3 },
    openShipment: { desc: "Lorem Ipsum to use as filler text", title: "Open Shipment", value: 1 },
    closedShipment: { desc: "Lorem Ipsum to use as filler text", title: "RTO Post NDR", value: 6 },
  },
  ndr: {
    total: { desc: "Lorem Ipsum to use as filler text", title: "NDR Raised", value: 2 },
    ndrActive: { desc: "Lorem Ipsum to use as filler text", title: "NDR Active", value: 1 },
    ndrDelivered: { desc: "Lorem Ipsum to use as filler text", title: "NDR Delivered", value: 1 },
    rtoPostNdr: { desc: "Lorem Ipsum to use as filler text", title: "Closed Shipment", value: 0 },
  },
};

export function generateRandomData(dateRange: any): OrderData[] {
  const data: OrderData[] = [];
  const start = new Date(dateRange.from);
  const end = new Date(dateRange.to);
  let currentDate = start;

  // Function to get a random integer between min and max (inclusive)
  const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  while (currentDate <= end) {
    // const revenueChance = Math.random(); // Random value between 0 and 1
    const revenue = (getRandomInt(1000, 25000)).toFixed(2); // Random revenue between 1000 and 100000
    const orders = getRandomInt(10, 100); // Random number of orders between 10 and 100
    const picked = getRandomInt(10, 100).toFixed(2); // Random number of picked orders between 10 and 100
    const delivered = getRandomInt(10, +picked).toFixed(2); // Random number of delivered orders between 10 and picked

    data.push({
      date: currentDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
      orders,
      revenue: parseFloat(revenue), // Convert revenue to a float
      picked: parseFloat(picked),
      delivered: parseFloat(delivered),
    });

    // Increment the date by one day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  // data[10].revenue = 0 
  // data[10].orders = 0 
  // data[4].orders = 0 
  // data[4].revenue = 0 
  // data[15].orders = 0 
  // data[15].revenue = 0 

  return data;
}

export function generateRandomDashboardData(dateRange: any) {
  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const ordersRevenue = generateRandomData(dateRange);
  const result = {
    highlight: {
      orders: {
        today: getRandomInt(0, 10),
        yesterday: getRandomInt(0, 10)
      },
      revenue: {
        today: getRandomInt(1000, 5000),
        yesterday: getRandomInt(0, 5000)
      },
      picked: {
        today: getRandomInt(0, 10),
        yesterday: getRandomInt(0, 10)
      },
      delivered: {
        today: getRandomInt(0, 10),
        yesterday: getRandomInt(0, 10)
      },
      rto_oto: {
        today: getRandomInt(0, 5),
        yesterday: getRandomInt(0, 5)
      }
    },
    shipments: {
      active: getRandomInt(5, 20),
      yetToBePicked: getRandomInt(20, 50),
      openShipments: getRandomInt(5, 20),
      closedShipments: getRandomInt(50, 100)
    },
    ndr: {
      raised: getRandomInt(0, 5),
      active: getRandomInt(0, 5),
      delivered: getRandomInt(0, 5),
      rtoPostNdr: getRandomInt(0, 5)
    },
    ordersRevenue: ordersRevenue,
    zoneDistribution: {
      A: getRandomInt(0, 10),
      B: getRandomInt(0, 10),
      C: getRandomInt(0, 10),
      D: getRandomInt(0, 10),
      AB: getRandomInt(0, 20) // A + B combined
    },
    deliveryTimeline: {
      days1to2: getRandomInt(0, 10),
      days3to4: getRandomInt(0, 10),
      days5: getRandomInt(0, 10),
      daysMoreThan5: getRandomInt(0, 10),
      avgDays: parseFloat((Math.random() * (7 - 1) + 1).toFixed(1)) // random average between 1 and 7
    },
    channelDistribution: {
      manual: getRandomInt(10, 30), // Random total for manual
      shopify: getRandomInt(0, 10)   // Random total for shopify
    }
  };
  console.log(result)
  return result;
}

