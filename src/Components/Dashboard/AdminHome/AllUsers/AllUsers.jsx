import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { RiUserSettingsFill } from "react-icons/ri";


const AllUsers = () => {

    const axiosSecure = UseAxiosSecure();
    const { data: users = [] } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const res = await axiosSecure.get('/users', {
          params: { userType: 'User' } // Change 'deliveryMan' to the userType you need
        });
        return res.data;
      }
    });
    return (
        <div>
             <div>
        <div className="overflow-x-auto   my-20">
          <table className="table">
            {/* head */}
            <thead className="bg-red-400 text-white text-lg">
              <tr className="text-center">
                <th>Serial</th>
                <th>Email</th>
                <th>Name</th>
                <th>Number of parcel booked</th>
                <th>Make Delivery Man</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody className="text-xl text-center ">


              {
                users.map((user, index) =>
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.userEmail}</td>
                    <td>{user.userName}</td>
                    <td></td>
                    <td><button><RiUserSettingsFill /></button></td>
                    <td><button><RiUserSettingsFill /></button></td>
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

export default AllUsers;