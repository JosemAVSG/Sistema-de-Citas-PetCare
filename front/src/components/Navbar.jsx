import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.scss";
import paw from "../assets/svg paw.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/atuhSlice";
import imguser from "../assets/user.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faChevronUp, faX } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav
        className={`${styles.navbar} relative px-4 py-4 flex justify-between items-center `}
      >
        <div className={styles.logo}>
          <img src={paw} alt="logo"></img>
          <h1>Petcare</h1>
        </div>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-centerp-3" onClick={() => setIsOpen(!isOpen)} >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <ul className={`${styles.navegacion } hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto  lg:items-center lg:w-auto lg:space-x-6`}>
          <li>
            <Link to="/" className="hover:text-rose-600">Home</Link>
          </li>
          <li>
            <Link to="/myturns" className="hover:text-rose-600" >My Turns</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-rose-600">About</Link>
          </li>
        </ul>
        {authenticated ? (
          <div className=" hidden lg:flex dropdown relative md:static mr-6 ">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center"
            >
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={
                    user?.user?.profileImage
                      ? user?.user?.profileImage
                      : imguser
                  }
                />
              </div>
              <div className="ml-2 capitalize flex ">
                <h1 className="text-md text-black font-semibold m-0 p-0 leading-none">
                  Bienvenido {user?.user?.name}
                </h1>
              </div>
              <FontAwesomeIcon
                icon={openDropdown ? faChevronUp : faChevronDown}
                className="ml-2 text-xs leading-none"
              />
            </button>
            <div
              className={`absolute right-0 mt-8 w-48  text-neutral-900 rounded-lg py-2 shadow-xl  ${
                openDropdown ? "block" : "hidden"
              }`}
            >
              <Link
                exact="true"
                to="/profile"
                className={styles.sesion + " block px-4 py-2 text-sm mb-2"}
              >
                Mi perfil
              </Link>
              <hr></hr>
              <li className={styles.sesion}>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </div>
          </div>
        ) : (
          <ul className={`${styles.btn_sesion} hidden lg:flex  transition duration-200 `} >
            <li className={styles.sesion}>
              <Link to="/login">Login</Link>
            </li>
            <li className={styles.sesion}>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </nav>
      
    <div className= {`navbar-menu relative z-50  ${isOpen ? "flex": "hidden"}`}>
    <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 border-r overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
      <div className={styles.logo}>
          <img src={paw} alt="logo"></img>
          <h1>Petcare</h1>
        </div>
        <button className="navbar-close" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faX} className="hover:text-rose-600" />
        </button>
      </div>
      <div>
      <ul className={`${styles.navegacion }  flex flex-col text-start w-1/2  mt-36 mx-32 bg-transparent  `}>
          <li>
            <Link className="hover:text-rose-600" to="/">Home</Link>
          </li>
          <li>
            <Link className="hover:text-rose-600" to="/myturns">My Turns</Link>
          </li>
          <li>
            <Link className="hover:text-rose-600" to="/about">About</Link>
          </li>
        </ul>
      </div>
      {!authenticated ? (
      <div className="mt-auto">

      <ul className={`${styles.btn_sesion}flex flex-col m-auto  bg-transparent text-center w-3/4 `} >
            <li className={styles.sesion}>
              <Link to="/login">Login</Link>
            </li>
            <li className={styles.sesion}>
              <Link to="/register">Register</Link>
            </li>
          </ul>

      
        <p className="my-4 text-xs text-center text-gray-900">
          <span>Coded with ❤️ by Jose</span>
        </p>
      </div>
        
      ): ( 
        <div className="mt-auto">

<div className="  lg:flex dropdown relative md:static mr-6 ">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center"
            >
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={
                    user?.user?.profileImage
                      ? user?.user?.profileImage
                      : imguser
                  }
                />
              </div>
              <div className="ml-2 capitalize flex ">
                <h1 className="text-md text-black font-semibold m-0 p-0 leading-none">
                  Bienvenido {user?.user?.name}
                </h1>
              </div>
              <FontAwesomeIcon
                icon={openDropdown ? faChevronUp : faChevronDown}
                className="ml-2 text-xs leading-none"
              />
            </button>
            <div
              className={`absolute right-0 -mt-32 w-48   text-neutral-900 rounded-lg  shadow-xl ${
                openDropdown ? "block" : "hidden"
              }`}
            >
              <Link
                exact="true"
                to="/profile"
                className={styles.sesion + " block px-4 py-2 text-sm mb-2"}
              >
                Mi perfil
              </Link>
              <hr></hr>
              <li className={styles.sesion}>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </div>
          </div>
        <p className="my-4 text-xs text-center text-gray-900">
          <span>Coded with ❤️ by Jose</span>
        </p>
      </div>
      )}
    </nav>
    </div>
    </header>
   
  );
};

export default Navbar;
