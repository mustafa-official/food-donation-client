import { Helmet } from "react-helmet-async";
import { Link, ScrollRestoration } from "react-router-dom";
import error from "../../assets/error.png";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800">
      <Helmet>
        <title>Pure Harvest | Error</title>
      </Helmet>
      <img className="w-96" src={error} alt="" />
      <Link to="/">
        <button className="bg-[#00BBE4] text-white text-[14px] md:text-[16px] px-4 py-2 rounded-md ">
          Back to home
        </button>
      </Link>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default ErrorPage;
