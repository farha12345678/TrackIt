import { useContext } from "react";
import { FaBell } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <NavLink className={({ isActive }) => isActive ? 'border-b-2 border-gray-500 text-gray-700 text-lg px-2' : 'text-lg px-2 hover:text-gray-700'} to='/'>
        <li>Home</li>
      </NavLink>
      <NavLink className={({ isActive }) => isActive ? 'border-b-2 border-gray-500 text-gray-700 text-lg px-2' : 'text-lg px-2 hover:text-gray-700'} to='/dashboard'>
        <li>Dashboard</li>
      </NavLink>
      <NavLink className="text-lg px-2 hover:text-gray-700">
        <li><FaBell /></li>
      </NavLink>
    </>
  );

  return (
    <div className=" shadow-md relative z-50">
      <div className="navbar   bg-gradient-to-r from-red-100 via-red-50 to-red-200 text-gray-800">
        <div className="navbar-start ">
          {/* Mobile menu button */}
          <div className="dropdown lg:hidden">
            <button className="btn btn-ghost" tabIndex={0}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul className="dropdown-content absolute top-14 left-0 z-50 p-2 shadow-lg bg-white rounded-lg w-52 text-gray-700">
              {links}
              {!user && (
                <>
                  <Link to='/login'><li><button className="font-medium text-lg text-gray-600 hover:text-gray-800">Log In</button></li></Link>
                  <Link to='/register'><li><button className="font-medium text-lg text-gray-600 hover:text-gray-800">Register</button></li></Link>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img className="w-10 rounded-full" src="/src/assets/logo2.png" alt="Logo" />
            <Link to="/" className="text-3xl font-semibold tracking-wide text-gray-700">
              Track<span className="text-gray-600">IT</span>
            </Link>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-x-4">
            {links}
          </ul>
        </div>

        {/* User account / Login-Register */}
        <div className="navbar-end flex items-center space-x-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-circle avatar" tabIndex={0}>
                <img src={user.photoURL || "https://i.ibb.co/d0n94nJ/user-1.png"} alt="User" className="rounded-full w-10 h-10 object-cover" />
              </button>
              <ul className="dropdown-content mt-3 p-3 shadow-lg bg-white rounded-lg w-48 text-gray-700">
                <li className="font-medium text-center">{user.displayName || user.email}</li>
                <NavLink className={({ isActive }) => isActive ? 'border-b-2 border-gray-500 text-gray-700 text-lg px-2' : 'text-lg px-2 hover:text-gray-700'} to='/dashboard'>
                  <li>Dashboard</li>
                </NavLink>
                <li><button onClick={logOut} className="font-medium text-gray-600 hover:text-gray-800">Log Out</button></li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <Link to='/login'><button className="font-medium text-lg text-gray-600 hover:text-gray-800">Log In</button></Link>
              <Link to='/register'><button className="font-medium text-lg text-gray-600 hover:text-gray-800">Register</button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
