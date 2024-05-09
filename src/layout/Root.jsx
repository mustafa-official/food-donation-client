import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const Root = () => {
  return (
    <div className="bg-[#212428] text-white">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-329px)] px-4 lg:px-12">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
