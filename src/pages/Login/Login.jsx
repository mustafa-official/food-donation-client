import { useContext } from "react";
import { Link, ScrollRestoration } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
const Login = () => {
  const { loginUser, googleLogin, user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((result) => {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            {
              email: result?.user?.email,
            },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            navigate(location.state ? location.state : "/");
            toast.success("Login Successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        toast.error("Password doesn't match");
        // console.log(error.code);
      });
  };
  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: result?.user?.email,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Login Successfully");
          navigate(location.state ? location.state : "/");
          setUser(...user, result.photoURL);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  //Github Login
  //   const handleGithubLogin = () => {
  //     githubLogin().then(() => {
  //       navigate(location.state ? location.state : "/");
  //       toast.success("Login Successfully");
  //     });
  //   };
  return (
    <div className="md:px-10 pt-1 pb-8 px-6 lg:px-12">
      <Helmet>
        <title>Pizza House | Login</title>
      </Helmet>
      <div className="w-full mx-auto max-w-md mt-8 lg:mt-6 px-4 md:px-8 py-8 mb-3 lg:mb-5 space-y-2 rounded-xl border bg-[#ffffff11] text-gray-100">
        <h1 className="text-2xl font-bold text-center mb-12">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1 text-sm">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md  border bg-gray-900 text-gray-100 "
            />
          </div>
          <div className="space-y-1 text-sm">
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full  px-4 py-3 rounded-md  border bg-gray-900 text-gray-100"
            />
            <div className="flex justify-end text-xs text-gray-400">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button className="block w-full p-3 font-bold text-center rounded-sm  bg-[#00BBE4]">
            Login
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-400">Or</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            aria-label="Log in with Google"
            className="p-3 rounded-sm"
          >
            <svg className="w-7 h-7" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </button>
          {/* Github login button */}
          {/* <button
            onClick={handleGithubLogin}
            aria-label="Log in with GitHub"
            className="p-3 rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
          </button> */}
        </div>
        <p className="text-xs text-center sm:px-6 text-gray-400">
          Dont have an account?{" "}
          <Link to="/register" className="underline font-bold">
            Register
          </Link>
        </p>
        <ScrollRestoration></ScrollRestoration>
      </div>
    </div>
  );
};

export default Login;
