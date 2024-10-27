import { DataCard } from '@/components/data-card';
import { AppTooltip } from '@/components/app-tooltip';

import { ShoppingBag, DollarSign, BoxSelect, Truck } from "lucide-react"

export default function Dashboard() {

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
        <header className='pb-2 border-b'>
          <h2 className='font-semibold text-2xl w-full'>Overview</h2>

        </header>

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