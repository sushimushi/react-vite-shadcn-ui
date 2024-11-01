import { Card } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { DataCard } from '@/components/data-card';
import { AppTooltip } from '@/components/app-tooltip';
import { DataCardTwo } from '@/components/data-card-two';
import { OrderRevenueChart } from '@/components/charts/chart-bar';
import { DatePickerWithRange } from '@/components/app-datepicker';
import { OrderRevenueData, scaleType, typeType, HighlightType } from '@/models/models';
import { ShoppingBag, DollarSign, BoxSelect, Truck } from 'lucide-react';
import { generateRandomData, sectionTwoData, generateHighlights, calculateZoneTotals, calculateDeliveryTimeTotals, calculateChannelTotals } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PieChart from '@/components/charts/chart-pie';
import { DateRange } from "react-day-picker";


export default function Dashboard() {
  const keys: (keyof typeof sectionTwoData)[] = ["shipping", "ndr"];
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2012, 0, 20),
    to: new Date(2024, 0, 20),
  });

  const [selectedType, setSelectedType] = useState<typeType>('orders');
  const [selectedScale, setScaleScale] = useState<scaleType>('date');
  const [revenueAndOrderData, setRevenueAndOrderData] = useState<OrderRevenueData[]>([]);
  const [highlights, setHighlights] = useState<HighlightType>( {
      orders: { today: 0, yesterday: 0 },
      revenue: { today: 0, yesterday: 0 },
      picked: { today: 0, yesterday: 0 },
      delivered: { today: 0, yesterday: 0 },
      rto_oto: { today: 0, yesterday: 0 },
    });

  const handleScaleChange = (value: string) => {
    setScaleScale(value as scaleType);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value as typeType);
  };

  useEffect(() => {
    setRevenueAndOrderData(generateRandomData(date));
    calculateZoneTotals(revenueAndOrderData);
    //@ts-ignore
    setHighlights(generateHighlights(date));
  }, [date]);

  const calculateTotalOrders = (data: OrderRevenueData[]) =>
    data.reduce((total, entry) => total + entry.orders, 0);

  const calculateTotalRevenue = (data: OrderRevenueData[]) =>
    data.reduce((total, entry) => total + entry.revenue, 0);

  return (
    <>
      <h1 className='font-semibold text-2xl'>Welcome, <span className='font-bold uppercase'>WareIQ</span></h1>

      <section className='pt-8'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {sectionOneData.map((item, index) => (
            <div key={index}>
              <h2 className="text-sm font-bold mb-2">
                {item.title}
                <AppTooltip Info={"some random info about the each card."} />
              </h2>
              {/* @ts-ignore */}
              <DataCard Icon={<item.Icon />} data={highlights[item.name]} />
            </div>
          ))}
        </div>
      </section>

      <section className='pt-8'>
        <header className='pb-2 border-b flex justify-between'>
          <h2 className='font-semibold text-2xl w-full'>Overview</h2>
          <DatePickerWithRange dateSetter={setDate} />
        </header>
        <div className="mt-4 grid grid-cols-2 gap-6">
          {keys.map(key => (
            <div key={key}>
              <h2 className="text-sm font-bold mb-2 uppercase">
                {key} <span className='font-normal ml-2 lowercase'>({date!.from!.toLocaleDateString()} to {date!.to!.toLocaleDateString()})</span>
              </h2>
              <DataCardTwo data={sectionTwoData[key]} />
            </div>
          ))}
        </div>
      </section>

      <section className='pt-8'>
        <Card>
          <h2 className="text-sm font-bold mb-2 uppercase p-4 border-b">
            Orders & Revenue
            <span className='font-normal ml-2 lowercase'>
              ({date!.from!.toLocaleDateString()} to {date!.to!.toLocaleDateString()}) <AppTooltip Info={"some random info about the each card."} />
            </span>
          </h2>
          <main className='p-4'>
            <div className='flex justify-between'>
              <div className='flex gap-4 grow'>
                <InfoCard label="Total Orders" value={calculateTotalOrders(revenueAndOrderData).toString()} />
                <InfoCard label="Total Revenue" value={`₹${calculateTotalRevenue(revenueAndOrderData).toLocaleString('en-IN')}`} />
              </div>

              <div className='flex gap-4'>
                <Select value={selectedScale} onValueChange={handleScaleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {["date", "week", "month", "year"].map(scale => (
                      <SelectItem key={scale} value={scale}>{scale.charAt(0).toUpperCase() + scale.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {["orders", "picked", "delivered"].map(type => (
                      <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='pr-2'>
              <OrderRevenueChart data={revenueAndOrderData} scale={selectedScale} type={selectedType} />
            </div>
          </main>
        </Card>
      </section>

      <div className="grid grid-cols-2 gap-6 pt-8 pb-8">
        {Object.keys(pieChartMap).map((key, index) => (
          <Card key={index}>
            <h2 className="text-sm font-bold mb-2 uppercase p-4 border-b">
              {pieChartMap[key]}
              <span className='font-normal ml-2 lowercase'>
                ({date!.from!.toLocaleDateString()} to {date!.to!.toLocaleDateString()}) <AppTooltip Info={"some random info about the each card."} />
              </span>
            </h2>
            <main className='p-4'>
              { 
              key == 'zoneDistribution' ? <PieChart data={calculateZoneTotals(revenueAndOrderData)} /> : 
              key == 'deliveredTimeline' ?  <PieChart data={calculateDeliveryTimeTotals(revenueAndOrderData)} /> :
              <PieChart data={calculateChannelTotals(revenueAndOrderData)} />
              } 
            </main>
          </Card>
        ))}
      </div>
    </>
  );
}

const InfoCard = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-gray-100 rounded-lg w-48 px-4 py-2">
    <span className='text-xs font-semibold text-gray-700'>{label}</span>
    <span className="block text-primary font-bold">{value}</span>
  </div>
);

const sectionOneData = [
  { Icon: ShoppingBag, title: "Orders", name: "orders" },
  { Icon: DollarSign, title: "Revenue", name: "revenue" },
  { Icon: BoxSelect, title: "Picked", name: "picked" },
  { Icon: Truck, title: "Delivered", name: "delivered" },
  { Icon: DollarSign, title: "RTO/DTO", name: "rto_oto" },
].map(item => ({ ...item, amount: 0, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build." }));

const pieChartMap: Record<string, string> = {
  zoneDistribution: "Zone Wise Distribution", deliveredTimeline: "Delivery Timeline", channelDistribution: "Channel Distribution"
}