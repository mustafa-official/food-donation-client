import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import Headroom from "react-headroom";

const Root = () => {
  return (
    <div className="bg-[#010313] text-white">
      <Headroom>
        <Navbar></Navbar>
      </Headroom>
      <div className="min-h-[calc(100vh-329px)] px-6 lg:px-12">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
