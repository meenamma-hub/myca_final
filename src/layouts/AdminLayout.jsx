import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
function AdminLayout() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 min-w-0 p-6 bg-gray-100 dark:bg-slate-950">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
