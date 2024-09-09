import { useState } from "react";
import { FaEnvira, FaBars, FaTimes } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Employee from "./pages/employee/Employee";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/error/ErrorPage";
import InternalServerError from "./pages/error/InternalServerError";
import PageNotFound from "./pages/error/PageNotFound";
import { useSelector } from "react-redux";
import { RootState } from "./redux-store/store";
import GlobalLoading from "./components/global-loading/globalLoading";
import PopUp from "./components/popUp/PopUp";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const globalLoading:any= useSelector(
    (state: RootState) => state?.loading?.isLoading
  );

  return (
    <div className="flex h-lvh">
      {globalLoading && <GlobalLoading />}
      <PopUp />
      {/* Sidebar */}
      <div
        className={`md:w-[300px] bg-white md:flex flex-col justify-start gap-2 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 fixed md:relative z-40 h-full`}
      >
        {/* Logo */}
        <div className="p-5 px-10 pt-20 md:pt-5">
          <h3 className="text-blue-600 font-bold text-2xl flex gap-2">
            <FaEnvira className="text-green-700 my-auto" /> EMS
          </h3>
          <h3 className="text-blue-300 text-sm">Employee Management System</h3>
          <hr className="border-sky-600 mt-2" />
        </div>
        {/* Menu */}
        <div className="px-10">
          <p
            onClick={() => {
              navigate("/");
              setIsSidebarOpen(false); // Close sidebar after clicking
            }}
            className={`${
              location.pathname === "/" && "text-blue-600"
            } py-2 text-blue-400 hover:text-blue-600 font-[200px] flex gap-2 cursor-pointer group`}
          >
            <MdViewKanban className="my-auto text-xl transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
            Overview
          </p>
          <p
            onClick={() => {
              navigate("/employee");
              setIsSidebarOpen(false);
            }}
            className={`${
              location.pathname === "/employee" && "text-blue-600"
            } py-2 text-blue-400 hover:text-blue-600 font-[200px] flex gap-2 cursor-pointer group`}
          >
            <FaUser className="my-auto text-xl transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
            Employee
          </p>
          <p
            onClick={() => {
              navigate("/products");
              setIsSidebarOpen(false);
            }}
            className={`${
              location.pathname === "/products" && "text-blue-600"
            } py-2 text-blue-400 hover:text-blue-600 font-[200px] flex gap-2 cursor-pointer group`}
          >
            <AiFillProduct className="my-auto text-xl transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
            Products
          </p>
          <p
            onClick={() => {
              navigate("/sales");
              setIsSidebarOpen(false);
            }}
            className={`${
              location.pathname === "/sales" && "text-blue-600"
            } py-2 text-blue-400 hover:text-blue-600 font-[200px] flex gap-2 cursor-pointer group`}
          >
            <RiBarChartGroupedLine className="my-auto text-xl transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
            Sales
          </p>
          <p
            onClick={() => {
              navigate("/settings");
              setIsSidebarOpen(false);
            }}
            className={`${
              location.pathname === "/settings" && "text-blue-600"
            } py-2 text-blue-400 hover:text-blue-600 font-[200px] flex gap-2 cursor-pointer group`}
          >
            <IoSettings className="my-auto text-xl transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
            Settings
          </p>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-5 left-5 z-40">
        <button
          onClick={toggleSidebar}
          className="text-blue-600 text-3xl focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Main Container */}
      <div className="md:w-[calc(100vw-300px)] w-full bg-slate-50 ml-auto pt-10 md:pt-0">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/500" element={<InternalServerError />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
