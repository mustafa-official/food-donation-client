import { ScrollRestoration } from "react-router-dom";
import Banner from "../../components/Banner";
import FeaturedFoods from "../../components/FeaturedFoods";
import { Helmet } from "react-helmet-async";
import showup from "../../assets/banner.jpg";

const Home = () => {
  return (
    <section>
      <Helmet>
        <title>Pizza House</title>
      </Helmet>
      <Banner></Banner>
      <div className="px-6 lg:px-12">
        <FeaturedFoods></FeaturedFoods>
      </div>

      <div
        className="mt-14 h-[300px]  md:h-[600px]"
        style={{
          backgroundImage: `url(${showup})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <ScrollRestoration></ScrollRestoration>
    </section>
  );
};

export default Home;
