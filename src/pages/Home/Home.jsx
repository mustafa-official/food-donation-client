import { ScrollRestoration } from "react-router-dom";
import Banner from "../../components/Banner";
import FeaturedFoods from "../../components/FeaturedFoods";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <section>
      <Helmet>
        <title>Pizza House</title>
      </Helmet>
      <Banner></Banner>
      <div className="px-6 lg:px-12">
        <FeaturedFoods></FeaturedFoods>
        <ScrollRestoration></ScrollRestoration>
      </div>
    </section>
  );
};

export default Home;
