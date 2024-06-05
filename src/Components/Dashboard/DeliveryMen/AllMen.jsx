import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AllMen = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await axiosSecure.get('/deliveryMen');
            console.log(res.data);
            return res.data;
            
        }
        
        
    })
    return (
        <div>
            <div>
            <div className="overflow-x-auto mx-20 my-20">
  <table className="table">
    {/* head */}
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
            users.map((user,index )=> 
               <tr key={user._id}>
                <th>{index+1}</th>
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
            </div>
        </div>
    );
};

export default AllMen;