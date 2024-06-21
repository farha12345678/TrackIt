import { useContext, useState } from "react";
import { AuthContext } from './../../../Providers/AuthProvider';

import UseAxiosSecure from './../../../Hooks/UseAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import ManageReview from "../../Modal/ManageReview";
import { NavLink } from "react-router-dom";
import CheckOut from "./CheckOut";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
};


const MyParcel = () => {
  
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedPay, setSelectedPay] = useState(null);

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
                      <NavLink to='checkout' onClick={() => setSelectedPay(user)} className="btn">Pay</NavLink>
                      </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      {selectedParcel && (
        <ManageReview
          parcel={selectedParcel}

          onClose={() => setSelectedParcel(null)}

        />
      )}
      {
       selectedPay && (
        <CheckOut
        pay ={selectedPay}
        />
       )}
    </div>
  );
};

export default MyParcel;