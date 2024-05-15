import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import Headroom from "react-headroom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const Root = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <ReactLoading type="spin" color="#010313" height={30} width={30} />
      </div>
    );
  return (
    <div className="bg-[#010313] text-white">
      <Headroom>
        <Navbar></Navbar>
      </Headroom>
      <div className="min-h-[calc(100vh-329px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
