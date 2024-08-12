import { ScrollRestoration } from "react-router-dom";
import Banner from "../../components/Banner";
import FeaturedFoods from "../../components/FeaturedFoods";
import { Helmet } from "react-helmet-async";
import showup from "../../assets/five.png";
import Contact from "../../components/Contact";
import TrustedCompany from "../../components/TrustedCompany";

const Home = () => {
  return (
    <section className="overflow-hidden">
      <Helmet>
        <title>Pure Harvest</title>
      </Helmet>
      <Banner></Banner>

      <div className="px-6 lg:px-12">
        <FeaturedFoods></FeaturedFoods>
      </div>
      <div>
        <TrustedCompany></TrustedCompany>
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
      <div className="px-6 lg:px-12">
        <Contact></Contact>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </section>
  );
};

export default Home;
