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


export function generateRandomData(dateRange: any): OrderData[] {
  const data: OrderData[] = [];
  const start = new Date(dateRange.from);
  const end = new Date(dateRange.to);
  let currentDate = start;

  // Function to get a random integer between min and max (inclusive)
  const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

  while (currentDate <= end) {
    // const revenueChance = Math.random(); // Random value between 0 and 1
    const revenue = (getRandomInt(1000, 100000) / 100).toFixed(2); // Random revenue between 1000 and 100000
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
  data[10].revenue = 0
  return data;
}
