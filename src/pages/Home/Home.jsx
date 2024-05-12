import { ScrollRestoration } from "react-router-dom";
import Banner from "../../components/Banner";
import FeaturedFoods from "../../components/FeaturedFoods";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <section>
      <Helmet><title>Hey Foods</title></Helmet>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
      <ScrollRestoration></ScrollRestoration>
    </section>
  );
};

export default Home;
