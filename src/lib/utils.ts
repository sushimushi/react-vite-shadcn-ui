import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { OrderRevenueData } from "@/models/models"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function generateRandomData(dateRange: any): OrderRevenueData[] {
  const data: OrderRevenueData[] = [];
  const start = new Date(dateRange.from);
  const end = new Date(dateRange.to);
  let currentDate = start;

  // Function to get a random integer between min and max (inclusive)
  const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  // Function to get a random item from an array
  const getRandomItem = <T>(items: T[]): T => items[getRandomInt(0, items.length - 1)];

  while (currentDate <= end) {
    const revenue = getRandomInt(1000, 25000).toFixed(2);
    const orders = getRandomInt(10, 100);
    const picked = getRandomInt(10, 100).toFixed(2);
    const delivered = getRandomInt(10, +picked).toFixed(2);

    data.push({
      date: currentDate.toISOString().split('T')[0],
      orders,
      revenue: parseFloat(revenue),
      picked: parseFloat(picked),
      delivered: parseFloat(delivered),
      channel: getRandomItem(["shopify", "manual"]), // Randomly choose "shopify" or "manual"
      zone: getRandomItem(["A", "B", "C", "D"]), // Randomly choose between "A", "B", "C", "D"
      deliveryTimeline: getRandomInt(1, 10), // Random number of days between 1 and 10
    });

    // Increment the date by one day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
}

export function calculateZoneTotals(data: OrderRevenueData[]): Record<string, number> {
  const zoneTotals = {
    AB: 0,
    C: 0,
    D: 0,
  };

  data.forEach((entry) => {
    if (entry.zone === "A" || entry.zone === "B") {
      zoneTotals.AB += entry.orders; // Sum orders for zones A and B
    } else if (entry.zone === "C") {
      zoneTotals.C += entry.orders; // Sum orders for zone C
    } else if (entry.zone === "D") {
      zoneTotals.D += entry.orders; // Sum orders for zone D
    }
  });

  return zoneTotals;
}


export function generateHighlights() {
  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;  
    return {
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
    }
}

export function calculateDeliveryTimeTotals(data: OrderRevenueData[]): Record<string, number> {
  const deliveryTimeTotals = {
    "1-2 days": 0,
    "3-4 days": 0,
    "5 days": 0,
    ">5 days": 0,
  };

  data.forEach((entry) => {
    if (entry.deliveryTimeline >= 1 && entry.deliveryTimeline <= 2) {
      deliveryTimeTotals["1-2 days"] += entry.orders;
    } else if (entry.deliveryTimeline >= 3 && entry.deliveryTimeline <= 4) {
      deliveryTimeTotals["3-4 days"] += entry.orders;
    } else if (entry.deliveryTimeline === 5) {
      deliveryTimeTotals["5 days"] += entry.orders;
    } else if (entry.deliveryTimeline > 5) {
      deliveryTimeTotals[">5 days"] += entry.orders;
    }
  });

  return deliveryTimeTotals;
}

export function calculateChannelTotals(data: OrderRevenueData[]): Record<string, number> {
  const channelTotals = {
    shopify: 0,
    manual: 0,
  };

  data.forEach((entry) => {
    if (entry.channel === "shopify") {
      channelTotals.shopify += entry.orders;
    } else if (entry.channel === "manual") {
      channelTotals.manual += entry.orders;
    }
  });

  return channelTotals;
}
