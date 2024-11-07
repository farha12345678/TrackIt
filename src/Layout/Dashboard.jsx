import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen, FaHome, FaUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Components/UserHooks/UseAdmin";
import Loading from "../Components/Loader/Loading";

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const [userType, isLoading] = UseAdmin();

  // Redirect user based on userType
  useEffect(() => {
    if (!isLoading) {
      if (userType === "User") {
        navigate("/dashboard/book"); // Redirect to user dashboard
      } else if (userType === "Admin") {
        navigate("/dashboard/allParcel"); // Redirect to admin dashboard
      } else if (userType === "Delivery Man") {
        navigate("/dashboard/list"); // Redirect to delivery man dashboard
      }
    }
  }, [userType, isLoading, navigate]);

  // Check if loading state is triggered
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-red-400 to-red-600 text-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>

        <ul className="space-y-4 text-lg">
          {/* Delivery Man Links */}
          {userType === 'Delivery Man' && (
            <>
              <li>
                <NavLink
                  to='/dashboard/list'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <IoStatsChart /> My Delivery List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/dashboard/reviews'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <FaBoxOpen /> My Reviews
                </NavLink>
              </li>
            </>
          )}

          {/* User Links */}
          {userType === 'User' && (
            <>
              <li>
                <NavLink
                  to='/dashboard/book'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <FaBoxOpen /> Book a Parcel
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/dashboard/myParcel'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <FaUser /> My Parcels
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/dashboard/userProfile'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <CgProfile /> My Profile
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Links */}
          {userType === 'Admin' && (
            <>
              <li>
                <NavLink
                  to='/dashboard/allParcel'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <FaBoxOpen /> All Parcels
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/dashboard/allUser'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <FaUser /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/dashboard/allMen'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <CgProfile /> All Delivery Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/dashboard/stat'
                  className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
                >
                  <IoStatsChart /> Statistics
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Links */}
          <div className="my-8 border-t-2 border-gray-300"></div>
          <li>
            <NavLink
              to='/'
              className="flex items-center gap-2 hover:bg-gray-600 p-2 rounded-md transition-colors"
            >
              <FaHome /> Go To Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8">
        {/* Content rendered through Outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
