import { DataCard } from '@/components/data-card';

import { useState } from 'react';
import { ShoppingBag, DollarSign, BoxSelect, Truck } from "lucide-react"

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <h1 className='font-semibold text-2xl'>Welcome, <span className='font-bold uppercase'>WareIQ</span></h1>
            <section className='grid grid-cols-5 gap-6 pt-8'>
                {sectionOneData.map((item, index) => (
                    <div>
                        <h2 className="text-sm font-bold mb-2">{item.title}</h2>
                        <div className='col-span-1' key={index}>
                        <DataCard Icon={<item.Icon/>}/>
                        </div>
                    </div>
                ))}
            </section>

            <section>
              
            </section>
        </>
    );
}

const sectionOneData = [
    {Icon: ShoppingBag, title: "Orders", amount: 6, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
    {Icon: DollarSign, title: "Revenue", amount: 2610, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
    {Icon: BoxSelect, title: "Picked", amount: 0, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
    {Icon: Truck, title: "Delivered", amount: 0, percentage: 100, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." },
    {Icon: DollarSign, title: "RTO/DTO", amount: 0, percentage: 0, trend: "up", desc: "Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts." }
]