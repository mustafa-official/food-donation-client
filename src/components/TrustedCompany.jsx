import a from "../assets/a.png";
import b from "../assets/b.png";
import c from "../assets/c.png";
import d from "../assets/d.png";
import e from "../assets/e.png";
import f from "../assets/f.png";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const TrustedCompany = () => {
  return (
    <section className="p-6 mt-8 lg:mt-14 text-gray-100">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Top Donator Companies
        </h2>
      </div>
      <div className="grid grid-cols-2 items-center md:gap-10 gap-8 lg:gap-14 mt-8 lg:mt-10 lg:grid-cols-3 text-gray-400">
        <div data-aos="fade-up-right" data-aos-duration="1000">
          <img className="max-w-[30%] mx-auto" src={b} alt="" />
        </div>
        <div data-aos="fade-up" data-aos-duration="1000">
          <img className="max-w-[30%] mx-auto" src={a} alt="" />
        </div>
        <div data-aos="fade-up-left" data-aos-duration="1000">
          <img className="max-w-[30%] mx-auto" src={c} alt="" />
        </div>
        <div data-aos="fade-down-right" data-aos-duration="1000">
          <img className="max-w-[30%] mx-auto" src={d} alt="" />
        </div>
        <div data-aos="fade-down" data-aos-duration="1000">
          <img className="max-w-[30%] mx-auto" src={e} alt="" />
        </div>
        <div data-aos="fade-down-left" data-aos-duration="1000">
          <img className="max-w-[30%] mx-auto" src={f} alt="" />
        </div>
      </div>
    </section>
  );
};

export default TrustedCompany;
