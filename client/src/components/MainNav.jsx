import React,{ useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log(carts.length);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>
            <NavLink to={"/"} className={({isActive})=>
            isActive 
            ? "bg-red-950 px-3 py-2 rounded-md text-base font-bold text-white"
            : 'px-3 py-2 text-base font-bold hover:bg-gray-200 rounded-md'}>
            HOME
            </NavLink>

            <NavLink to={"/shop"} className={({isActive})=>
            isActive 
            ? "bg-red-950 px-3 py-2 rounded-md text-base font-bold text-white"
            : 'px-3 py-2 text-base font-bold hover:bg-gray-200 rounded-md'}>
              Shop
              </NavLink>

            <NavLink to={"/cart"}className={({isActive})=>
            isActive 
            ? "bg-red-950 px-3 py-2 rounded-md text-base font-bold text-white relative"
            : 'px-3 py-2 text-base font-bold relative hover:bg-gray-200 rounded-md'}>
              Cart 

              { carts .length > 0 && (
              <span className="absolute bottom-6 left-11 rounded-full px-2 bg-red-400 text-white">{carts.length}</span>
              )}
              
            </NavLink>

          </div>
          {
            user 
            ?  <div className="flex items-center gap-4">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-gray-200
              px-2 py-3 rounded-md"
            >
              <img
                className="w-8 h-8"
                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-professor-avatars-flat-icons-pack-people-456317.png?f=webp&w=256"
              />

              <ChevronDown />
            </button>

            {isOpen && (
              <div className="absolute top-16 bg-white shadow-md z-50">
                <Link
                  to={"/user/history"}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  History
                </Link>
                <button 
                  onClick={()=>logout()}
                  className="block px-4 py-2 hover:bg-gray-200">
                  Logout
                </button>
              </div>
            )}
          </div>
            :  <div className="flex items-center gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/register"}
            >
              Register
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium "
              }
              to={"/login"}
            >
              Login
            </NavLink>
          </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
