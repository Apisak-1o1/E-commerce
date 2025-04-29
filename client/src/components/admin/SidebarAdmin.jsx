import React from "react";
import { NavLink } from "react-router-dom";
import { SquareActivity, NotebookPen, MonitorX, ListCollapse, AlignVerticalJustifyEnd } from "lucide-react";

const SidebarAdmin = () => {
  return (
    <div className="bg-gray-500 w-64 text-white flex flex-col h-screen">
      <div className="h-24 bg-blue-950 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700  text-gray-200 px-4 py-2 rounded flex items-center"
              : "text-white px-4 py-2 hover:bg-gray-800 rounded flex items-center"
          }
        >
          <SquareActivity className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700  text-gray-200 px-4 py-2 rounded flex items-center"
              : "text-white px-4 py-2 hover:bg-gray-800 rounded flex items-center"
          }
        >
          <NotebookPen className="mr-2" />
          Manage
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700  text-gray-200 px-4 py-2 rounded flex items-center"
              : "text-white px-4 py-2 hover:bg-gray-800 rounded flex items-center"
          }
        >
          <AlignVerticalJustifyEnd  className="mr-2" />
          Category
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700  text-gray-200 px-4 py-2 rounded flex items-center"
              : "text-white px-4 py-2 hover:bg-gray-800 rounded flex items-center"
          }
        >
          <ListCollapse className="mr-2" />
          Product
        </NavLink>
      </nav>
      <div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700  text-gray-200 px-4 py-2 rounded flex items-center"
              : "text-white px-4 py-2 hover:bg-gray-800 rounded flex items-center"
          }
        >
          <MonitorX className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
