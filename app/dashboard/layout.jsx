import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default  function DashboardLayout({ children }) {
  return (
    <div>
    <Sidebar />
    <Navbar />
      {children}
    </div>
  );
}