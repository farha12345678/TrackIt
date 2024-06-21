import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";


const AllDeliveryMen = () => {

   const axiosSecure = UseAxiosSecure();
 const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: { userType: 'Delivery Man' } 
      });
      console.log(users);
      return res.data;
    }
  });

  

  const { data: parcels = []} = useQuery({
    queryKey: [users?.userEmail],
    queryFn: async () => {
        const res = await axiosSecure.get('/parcel');
       
        return res.data;

    }


})
console.log(parcels);

const countDeliveredParcels = (deliveryManEmail) => {
  return parcels.filter(parcel => parcel.deliveryManEmail === deliveryManEmail && parcel.status === 'Deliver').length;
};

 
  return (
    <div>
      <div>
        <div className="overflow-x-auto mx-20 my-20 ">
          <table className="table">
            {/* head */}
            <thead className="bg-red-400 text-white text-xl text-center">
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Number of parcel delivered</th>
                <th>Average review</th>
              </tr>
            </thead>
            <tbody>
        {users.map((man, index) => (
          <tr className="text-center text-xl" key={index}>
             <th>{index + 1}</th>
            <td>{man.userName}</td>
            <td>+{man.userNumber}</td>
            <td>{countDeliveredParcels(man.userEmail)}</td>
          </tr>
        ))}
      </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDeliveryMen;