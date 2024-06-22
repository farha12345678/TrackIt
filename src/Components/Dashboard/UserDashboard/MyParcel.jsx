import { useContext, useState } from "react";



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
  

  const { user } = useContext(AuthContext)

  const axiosSecure = UseAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${user?.email}`);
      console.log('all parcels', res.data);
      return res.data;
    }
  })

 

  return (
    <div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">

            <thead className="bg-red-400 text-white text-center">
              <tr>
                <th>Parcel Type</th>
                <th>Requested <br /> Delivery Date</th>
                <th>Approximate <br /> Delivery Date,</th>
                <th>Booking <br /> Date</th>
                <th>Delivery <br /> Men ID</th>
                <th>Booking <br /> Status</th>
                <th>Update</th>
                <th>Cancel</th>
                <th>Review</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody className="text-center">

              {
                Array.isArray(parcels) && parcels?.map((users) =>
                  <tr key={users._id}>
                    <th>{users.type}</th>
                    <td>{users.deliveryDate}</td>
                    <td>{users.approxDeliveryDate}</td>
                    <td>{formatDate(users.bookingDate)}</td>
                    <td>{users.deliveryManId}</td>
                    <td>{users.status}</td>
                    <td>Update</td>
                    <td >Cancel</td>
                    <td onClick={() => setSelectedParcel(users)}>Review</td>
                    <td>
                     pay
                      </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      {selectedParcel && (
        <ManageReviews
          parcel={selectedParcel}

          onClose={() => setSelectedParcel(null)}

        />
      )}
      
    </div>
  );
};

export default MyParcel;