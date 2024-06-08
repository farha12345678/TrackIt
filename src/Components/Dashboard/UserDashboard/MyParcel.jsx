import { useContext } from "react";
import { AuthContext } from './../../../Providers/AuthProvider';

import UseAxiosSecure from './../../../Hooks/UseAxiosSecure';
import { useQuery } from "@tanstack/react-query";


const MyParcel = () => {

    const { user } = useContext(AuthContext)
  
    const axiosSecure = UseAxiosSecure();
    const { data: parcels  } = useQuery({
        queryKey: [user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcel/${user?.email}`);
            console.log(res.data);
            console.log(parcels);
            return res.data;
            
        }
        
        
    })

    return (
        <div>
            <h1>{parcels.name}</h1>
             {/* <div>
        <div className="overflow-x-auto mx-20 my-20">
          <table className="table">
          
            <thead className="bg-red-400 text-white text-xl">
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Number of parcel delivered</th>
                <th>Average review</th>
              </tr>
            </thead>
            <tbody className="text-xl text-center">


              {
                parcels.map((user, index) =>
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>+{user.phoneNumber}</td>
                    <td>{user.parcelsDelivered}</td>
                    <td className="">{user.averageReview}</td>
                  </tr>
                )
              }


            </tbody>
          </table>
        </div>
      </div>  */}
        </div>
    );
};

export default MyParcel;