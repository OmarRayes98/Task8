import AdminSidebar from "@/components/AdminSidebar/AdminSidebar"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  return (
    <section className="h-screen grid grid-cols-[auto_1fr] overflow-y-auto"> 

        
      <AdminSidebar/>

      <Outlet/>

    </section>
  )
}

export default DashboardLayout
