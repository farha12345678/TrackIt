import { useContext } from "react";
import { FaBell } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../Providers/AuthProvider";



const Navbar = () => {

  const { user, logOut } = useContext(AuthContext)

  const links = <>
    <NavLink className={({ isActive }) => isActive ? 'border-x-2 border-red-400 text-red-600 text-xl ' : 'text-xl border-x-2 '} to='/'><li>Home</li></NavLink>
    {/* <NavLink className={({ isActive }) => isActive ? 'border-x-2 border-red-400 text-red-600 text-xl ' : 'text-xl border-x-2 '} to='/dashboard'><li>Dashboard</li></NavLink> */}
    <NavLink className='text-xl' to='/dashboard/myParcel'><li><p><FaBell /></p></li></NavLink>

  </>
  return (
    <div>
      <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
                {links}
                <Link to='/login'><li>
                <button className="font-medium text-xl ml-4 text-purple-600">Log In</button></li></Link>
                <Link to='/register'><li>
                <button className="font-medium  text-xl ml-4 text-purple-600">Register</button></li></Link>
              </ul>
            </div>
            <div className="flex">
              <img className="w-16" src="/src/assets/logo2.png" alt="" />
              <a className="font-bold  text-5xl">TrackIT</a>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-x-6">
              {links}
            </ul>
          </div>
          <div className="navbar-end ">
            {
              user ? <>

                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1  rounded-full "><img src={user?.photoURL ||
                    <img className="rounded-full  w-24" src="https://i.ibb.co/d0n94nJ/user-1.png" />} /></div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <NavLink className={({ isActive }) => isActive ? 'border-x-2 border-red-400 text-red-600 text-xl ' : 'text-xl border-x-2 '} to='/dashboard'><li>Dashboard</li></NavLink>
                    <Link><li onClick={logOut} className="font-bold   text-xl text-blue-500">Log Out</li></Link>

                  </ul>
                </div>
              </>
                : <>
                 <div className="hidden lg:flex">
                 <Link to='/login'><button className="font-medium text-xl ml-4 text-purple-600">Log In</button></Link>
                 <Link to='/register'><button className="font-medium  text-xl ml-4 text-purple-600">Register</button></Link>
                 </div>
                </>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;