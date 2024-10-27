"use client"

import * as React from "react"
import WareIQLogo from '@/assets/WareIQLogo.svg';
import { Wallet, Search, Download, Bell } from "lucide-react"


import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";


export function AppNavbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <div className="grid place-center">
          <img src={WareIQLogo} alt="Ware Iq Logo" className="w-20" />
        </div>

        <div className="grow">
          <div className="flex gap-2 max-w-[700px] m-auto">
          <Button variant={"ghost"} className="text-red-500">
            <span className="text-blue-500">
              App Credit:
            </span>
            -$1451.28
          </Button>
          <Button><Wallet className="mx-auto"/> Recharge</Button>
          <Input placeholder="Search" icon={<Search className="mx-auto w-4"/>}></Input>
          <Button variant={"ghost"}><Plus className="mx-auto"/></Button>
          <Button variant={"ghost"}><Download className="mx-auto"/></Button>
          <Button variant={"ghost"}><Bell className="mx-auto"/></Button>
          </div>
        </div>
      <div className="flex items-center justify-center gap-2">
        <Button variant={'link'} className="text-sm font-semibold mr-1 text-blue-500">Switch Back</Button>
        <span className="text-sm mr-1"><span className="font-semibold">Signed in </span>as Wareiq@wareiq.com</span>
      </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
