import Lottie from "lottie-react";
import message from "../assets/contact.json";
const Contact = () => {
  return (
    <div className="">
      <h2 className="lg:text-4xl text-3xl text-center mt-8 md:my-14 font-bold">
        Contact Us
      </h2>
      <div className="md:mt-0 mt-4 lg:mt-0 flex justify-center items-center">
        <div className="grid mb-2 md:mb-6 grid-cols-1 items-center gap-4 lg:gap-12 rounded-lg md:grid-cols-2">
          <div className="w-full lg:w-[450px]">
          <Lottie animationData={message}></Lottie>
          </div>
          <div>
            <form className="space-y-2 text-black">
              <div>
                <label htmlFor="name" className="text-sm">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full py-2 px-3 rounded border border-[#00BBE4]"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full py-2 px-3 rounded border border-[#00BBE4]"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="3"
                  placeholder="Write Your Issue.."
                  className="w-full p-3 rounded border border-[#00BBE4]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-3 text-sm hover:bg-[#00bae4e1] font-bold tracking-wide uppercase rounded bg-[#00BBE4] text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
