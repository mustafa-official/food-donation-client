import { useNavigation } from "react-router-dom";
import Banner from "../../components/Banner";
import FeaturedFoods from "../../components/FeaturedFoods";

const Home = () => {
  const navigation = useNavigation();
  if (navigation.state === "loading") return <p className="text-red-500 text-3xl">Loading...</p>;
  return (
    <section>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
    </section>
  );
};

export default Home;
