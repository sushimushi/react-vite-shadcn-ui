import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div>
      <AppNavbar />
    </div>
      <SidebarProvider>
        <AppSidebar />
        <main className="pt-20 px-6 w-full">
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </>
  )
}
