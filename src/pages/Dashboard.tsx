import { DataCard } from '@/components/data-card';
import { AppTooltip } from '@/components/app-tooltip';
import { Card } from "@/components/ui/card"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"

import { ShoppingBag, DollarSign, BoxSelect, Truck } from "lucide-react"
import { DatePickerWithRange } from '@/components/app-datepicker';
import { DataCardTwo } from '@/components/data-card-two';
import React from 'react';
import { generateRandomData } from '@/lib/utils';
import {BarChart, OrderRevenueChart} from '@/components/charts/chart-bar';

export default function Dashboard() {
  const keys: (keyof typeof sectionTwoData)[] = ["shipping", "ndr"];
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const data = generateRandomData(date);
  console.log(data);
  return (
    <>
      <h1 className='font-semibold text-2xl'>Welcome, <span className='font-bold uppercase'>WareIQ</span></h1>
      <section className='pt-8 '>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {sectionOneData.map((item, index) => (
            <div>
              <h2 className="text-sm font-bold mb-2">
                {item.title}
                <AppTooltip Info={"some random info about the each card."} />
              </h2>
              <div className='col-span-1' key={index}>
                <DataCard Icon={<item.Icon />} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='pt-8'>
        <header className='pb-2 border-b flex space-between'>
          <h2 className='font-semibold text-2xl w-full'>Overview</h2>
          <DatePickerWithRange dateSetter={setDate} />
        </header>
        <div className="mt-4 grid grid-cols-2 gap-6">
          {keys.map((key) => (
            <div>
              <h2 className="text-sm font-bold mb-2 uppercase">
                {key} <span className='font-normal ml-2 lowercase'>({sectionTwoData[key].from} to {sectionTwoData[key].to})</span>
              </h2>
              <div key={key}>
                <DataCardTwo data={sectionTwoData[key]} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='pt-8 pb-20'>
        <Card className=''>
          <h2 className="text-sm font-bold mb-2 uppercase p-4 border-b">
            Orders & Revenue
            <span className='font-normal ml-2 lowercase'>
              (18-08-2024 to 17-09-2024) <AppTooltip Info={"some random info about the each card."} />
            </span>
          </h2>
          <main>
          {/* <BarChart data={data}/> */}
          <OrderRevenueChart data={data}/>
          </main>
        </Card>
      </section>
    </>
  );
}

const sectionOneData = [
  { Icon: ShoppingBag, title: "Orders", amount: 6, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
  { Icon: DollarSign, title: "Revenue", amount: 2610, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
  { Icon: BoxSelect, title: "Picked", amount: 0, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
  { Icon: Truck, title: "Delivered", amount: 0, percentage: 100, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
  { Icon: DollarSign, title: "RTO/DTO", amount: 0, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." }
]

const sectionTwoData = {
  shipping: { from: "17-09-2024", to: "18-08-2024", total: { desc: "Lorem Ipsum to use as filler text ", title: "Active Shipments", value: 10 }, yetToBePicked: { desc: "Lorem Ipsum to use as filler text ", title: "Yet to be Picked", value: 3 }, openShipment: { desc: "Lorem Ipsum to use as filler text ", title: "Open Shipment", value: 1 }, closedShipment: { desc: "Lorem Ipsum to use as filler text ", title: "RTO Post NDR", value: 6 } },
  ndr: { from: "17-09-2024", to: "18-08-2024", total: { desc: "Lorem Ipsum to use as filler text ", title: "NDR Raised", value: 2 }, ndrActive: { desc: "Lorem Ipsum to use as filler text ", title: "NDR Active", value: 1 }, ndrDelivered: { desc: "Lorem Ipsum to use as filler text ", title: "NDR Delivered", value: 1 }, rtoPostNdr: { desc: "Lorem Ipsum to use as filler text ", title: "Closed Shipment", value: 0 } },
}