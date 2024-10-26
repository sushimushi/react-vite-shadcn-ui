import { Home, PackageOpen,ShoppingCart,Truck,  IndianRupee, PieChart,Users, LayoutPanelLeft, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inventory",
    url: "#",
    icon: PackageOpen,
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart,
  },
  {
    title: "Control Tower",
    url: "#",
    icon: Truck,
  },
  {
    title: "Billing",
    url: "#",
    icon: IndianRupee,
  },
  {
    title: "Analytics",
    url: "#",
    icon: PieChart,
  },
  {
    title: "Customers",
    url: "#",
    icon: Users,
  },
  {
    title: "App Store",
    url: "#",
    icon: LayoutPanelLeft,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Sign Out",
    url: "#",
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} >
                      <item.icon className="mx-auto" />
                      <div>{item.title}</div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
