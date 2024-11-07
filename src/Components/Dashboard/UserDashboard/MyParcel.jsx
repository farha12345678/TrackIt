import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import ManageReviews from "../../Modal/ManageReviews";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
};

const MyParcel = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: parcels = [], refetch, isLoading, error } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${user?.email}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // cache data for 5 minutes
    enabled: !!user?.email, // Only run the query if user.email is available
  });

  useEffect(() => {
    // Refetch data if user.email is updated
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading parcels. Please try again.</div>;
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-red-500 text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-2 text-center">Parcel Type</th>
              <th className="px-4 py-2 text-center">Requested Delivery Date</th>
              <th className="px-4 py-2 text-center">Approximate Delivery Date</th>
              <th className="px-4 py-2 text-center">Booking Date</th>
              <th className="px-4 py-2 text-center">Delivery Man ID</th>
              <th className="px-4 py-2 text-center">Booking Status</th>
              <th className="px-4 py-2 text-center">Update</th>
              <th className="px-4 py-2 text-center">Cancel</th>
              <th className="px-4 py-2 text-center">Review</th>
              <th className="px-4 py-2 text-center">Pay</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {Array.isArray(parcels) && parcels.map((parcel, index) => (
              <tr key={parcel._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 text-center">{parcel.type}</td>
                <td className="px-4 py-3 text-center">{parcel.deliveryDate}</td>
                <td className="px-4 py-3 text-center">{parcel.approxDeliveryDate}</td>
                <td className="px-4 py-3 text-center">{formatDate(parcel.bookingDate)}</td>
                <td className="px-4 py-3 text-center">{parcel.deliveryManId}</td>
                <td className="px-4 py-3 text-center">{parcel.status}</td>
                <td className="px-4 py-3 text-center text-indigo-600 cursor-pointer hover:text-indigo-800">Update</td>
                <td className="px-4 py-3 text-center text-red-600 cursor-pointer hover:text-red-800">Cancel</td>
                <td onClick={() => setSelectedParcel(parcel)} className="px-4 py-3 text-center text-blue-500 cursor-pointer hover:text-blue-700">Review</td>
                <td className="px-4 py-3 text-center text-green-600 cursor-pointer hover:text-green-800">Pay</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedParcel && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
          <ManageReviews
            parcel={selectedParcel}
            onClose={() => {
              setSelectedParcel(null);
              refetch(); // Refetch data after modal close if necessary
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyParcel;
