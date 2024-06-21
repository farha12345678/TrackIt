import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";




const MyDeliveryList = () => {


    const { user } = useContext(AuthContext)

    const axiosSecure = UseAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-parcel/${user?.email}`);
            console.log(res.data);

            return res.data;

        }


    })
    console.log(parcels);


    const handleCancel = async (user) => {
        await axiosSecure.put(`/parcel/${user._id}`, {
            ...user,
            status: 'Cancel',

        });
        refetch()
    }
    const handleDeliver = async (user) => {
        await axiosSecure.put(`/parcel/${user._id}`, {
            ...user,
            status: 'Deliver',

        });
        refetch()
    }




    return (
        <div>
            <div>
                <div className="overflow-x-auto  my-20">
                    <table className="table">
                        <thead className="bg-red-400 text-white ">
                            <tr>
                                <th>Booked User’s <br /> Name</th>
                                <th>Receivers Name</th>
                                <th>Booked User’s <br /> Phone</th>
                                <th>Requested <br /> Delivery Date</th>
                                <th>Approximate <br /> Delivery Date</th>
                                <th>Recievers <br /> phone number</th>
                                <th>Receivers <br /> Address</th>
                                <th>View <br /> Location</th>
                                <th>Manage</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                parcels && parcels.map((user) =>
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.recName}</td>
                                        <td>+{user.number}</td>
                                        <td>{user.deliveryDate}</td>
                                        <td>{user.approxDeliveryDate}</td>
                                        <td>{user.recNumber}</td>
                                        <td>{user.deliveryAdd}</td>
                                        <td></td>
                                        <td >
                                            {user.status !== 'Cancel' ? (
                                                <button onClick={() => handleCancel(user)} className="bg-red-300 rounded-3xl text-center w-12" >Cancel</button>
                                            ) : (
                                                <button className="bg-gray-300 rounded-3xl text-center w-auto" disabled>Canceled</button>
                                            )}
                                        </td>
                                        <td  >
                                            {(user.status !== 'Deliver' ) ? (
                                                <button onClick={() => handleDeliver(user)} className="bg-red-300 rounded-3xl text-center" >Deliver</button>
                                            ) : (
                                                <button className="bg-gray-300 rounded-3xl text-center w-auto"  disabled>Delivered</button>
                                            )}
                                        </td>
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


export default MyDeliveryList;
