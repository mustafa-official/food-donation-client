import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import logo from "../../assets/lgopizza.png";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const navLink = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "  font-bold text-[#00BBE4]" : "hover:text-[#00BBE4]"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-foods"
        className={({ isActive }) =>
          isActive ? "  font-bold text-[#00BBE4]" : "hover:text-[#00BBE4]"
        }
      >
        Available Foods
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/add-food"
            className={({ isActive }) =>
              isActive ? "  font-bold text-[#00BBE4]" : "hover:text-[#00BBE4]"
            }
          >
            Add Food
          </NavLink>
          <NavLink
            to="/manage-foods"
            className={({ isActive }) =>
              isActive ? "  font-bold text-[#00BBE4]" : "hover:text-[#00BBE4]"
            }
          >
            Manage My Foods
          </NavLink>
          <NavLink
            to="/food-request"
            className={({ isActive }) =>
              isActive ? "  font-bold text-[#00BBE4]" : "hover:text-[#00BBE4]"
            }
          >
            My Food Request
          </NavLink>
        </>
      )}
    </>
  );

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        navigate("/login");
        toast.success("Logout Successfully");
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };
  return (
    <div>
      <div className="navbar backdrop-blur-md h-20 px-0 md:px-4 lg:px-12 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn  btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu z-50 menu-sm  bg-white text-black dropdown-content p-2 border border-[#00BBE4]   mt-4 rounded-box min-h-[calc(100vh-80px)] w-56"
            >
              <div className="flex lg:justify-normal justify-center lg:flex-row flex-col lg:mt-0 mt-4 items-center gap-3">
                {/* navlink for phone */}
                {navLink}
              </div>
            </ul>
          </div>

          <Link to="/">
            <img className="max-w-36 md:max-w-52" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div>
            <div className="flex lg:justify-normal justify-center lg:flex-row flex-col lg:mt-0 mt-4 items-center gap-3">
              {navLink}
            </div>
          </div>
        </div>
        <div className="navbar-end pr-4">
          <div className="flex items-center gap-3 lg:flex">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL ? user?.photoURL : ""}
                        id="userName"
                      />
                      <Tooltip
                        className="z-50"
                        variant="info"
                        anchorId="userName"
                        place="top"
                        content={user?.displayName}
                      ></Tooltip>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-50 p-2 shadow-md rounded-md border border-[#00BBE4] menu menu-sm  dropdown-content bg-black w-52"
                  >
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    className="bg-[#00BBE4] font-grotesk px-4 py-2 md:px-6 md:py-3 hover:bg-transparent border border-[#00BBE4]"
                    style={{
                      textTransform: "capitalize",
                      fontSize: "16px",
                    }}
                    size="md"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
