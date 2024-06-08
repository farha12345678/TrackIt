
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen, FaHome, FaUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Components/UserHooks/UseAdmin";


const Dashboard = () => {

    const [userType, isLoading] = UseAdmin()
    console.log(userType, isLoading);
   


    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-red-400 text-white ">
                <ul className="menu p-4 text-xl">

                    {userType === 'Delivery Man' && <>
                        <li><NavLink to='/dashboard/list'><IoStatsChart />My Delivery List</NavLink></li>
                        <li><NavLink to='/dashboard/reviews'><FaBoxOpen />My Reviews</NavLink></li>


                    </>}
                    {userType === 'User' &&
                        <>

                            <li><NavLink to='/dashboard/book'><FaBoxOpen />Book a Parcel</NavLink></li>
                            <li><NavLink to='/dashboard/myParcel'><FaUser />My Parcels</NavLink></li>
                            <li><NavLink to='/dashboard/userProfile'><CgProfile />My Profile</NavLink></li>
                        </>

                    }
                    {userType === 'Admin' && <>
                        <li><NavLink to='/dashboard/allParcel'><FaBoxOpen />All Parcels</NavLink></li>
                        <li><NavLink to='/dashboard/allUser'><FaUser />All Users</NavLink></li>
                        <li><NavLink to='/dashboard/allMen'><CgProfile />All Delivery Men</NavLink></li>
                        <li><NavLink to='/dashboard/stat'><IoStatsChart />Statistics</NavLink></li>

                    </>}


                    {/* admin */}
                    {/* <li><NavLink to='/dashboard/allParcel'><FaBoxOpen />All Parcels</NavLink></li>
                            <li><NavLink to='/dashboard/allUser'><FaUser />All Users</NavLink></li>
                            <li><NavLink to='/dashboard/allMen'><CgProfile />All Delivery Men</NavLink></li>
                            <li><NavLink to='/dashboard/stat'><IoStatsChart />Statistics</NavLink></li> */}
                    {/* user */}
                    {/* <li><NavLink to='/dashboard/book'><FaBoxOpen />Book a Parcel</NavLink></li>
                            <li><NavLink to='/dashboard/myParcel'><FaUser />My Parcels</NavLink></li>
                            <li><NavLink to='/dashboard/userProfile'><CgProfile />My Profile</NavLink></li> */}

                    {/* delivery man */}
                    {/* <li><NavLink to='/dashboard/list'><IoStatsChart />My Delivery List</NavLink></li>
                            <li><NavLink to='/dashboard/reviews'><FaBoxOpen />My Reviews</NavLink></li> */}





                    {/* shared */}
                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome>Go To Home</NavLink></li>
                </ul>
            </div>


            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
        // ....

    );
};

export default Dashboard;