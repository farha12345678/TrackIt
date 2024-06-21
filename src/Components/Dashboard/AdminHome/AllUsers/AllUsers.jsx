import {   useQuery} from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { RiUserSettingsFill } from "react-icons/ri";
import Swal from "sweetalert2";


const AllUsers = () => {
  
  const axiosSecure = UseAxiosSecure();
  const { data: users = [] , refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: { userType: 'User' } // Change 'deliveryMan' to the userType you need
      });
      return res.data;
    }
  });


  const { data: parcels = [] } = useQuery({
    queryKey: [users?.userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcel');

      return res.data;

    }


  })
 

  const countBookedParcels = (userEmail) => {
    return parcels.filter(parcel => parcel.email === userEmail).length;
  };

  const handleMakeDeliveryMan = (user) => {
    Swal.fire({
      title: `Make ${user.userName} a Delivery Man?`,
      text: `Are you sure you want to make ${user.userName} a Delivery Man?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/admin/${user._id}`, { userType: 'Delivery Man' });
          Swal.fire(
            'Updated!',
            `${user.userName} has been made a Delivery Man.`,
            'success'
          ).then(() => {
           refetch() // Refresh the page or update state to reflect changes
          });
        } catch (error) {
          console.error('Error making Delivery Man:', error);
          Swal.fire(
            'Error!',
            'There was an error making this user a Delivery Man.',
            'error'
          );
        }
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Make ${user.userName} an Admin?`,
      text: `Are you sure you want to make ${user.userName} an Admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/admin/${user._id}`, { userType: 'Admin' });
          Swal.fire(
            'Updated!',
            `${user.userName} has been made an Admin.`,
            'success'
          ).then(() => {
            refetch() // Refresh the page or update state to reflect changes
          });
        } catch (error) {
          console.error('Error making Admin:', error);
          Swal.fire(
            'Error!',
            'There was an error making this user an Admin.',
            'error'
          );
        }
      }
    });
  };



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
                    <td>{countBookedParcels(user.userEmail)}</td>
                    <td>
                     
                        <button onClick={() => handleMakeDeliveryMan(user)}><RiUserSettingsFill /></button>
                      </td>
                    <td>
                      <button onClick={() => handleMakeAdmin(user)}><RiUserSettingsFill /></button>
                      </td>
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