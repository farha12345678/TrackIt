import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useState } from "react";
import ManageParcel from "../../../Modal/ManageParcel";

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
};

const AllParcel = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);

    const axiosSecure = UseAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel');
            console.log(res.data);
            return res.data;
        }
    });

    return (
        <div>
            <div className="overflow-x-auto my-20">
                <table className="table">
                    <thead className="bg-red-400 text-white text-lg">
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Booking Date</th>
                            <th>Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody className="text-xl">
                        {parcels.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>+{user.number}</td>
                                <td>{formatDate(user.bookingDate)}</td>
                                <td>{user.deliveryDate}</td>
                                <td>{user.price}</td>
                                <td>{user.status}</td>
                                
                                <td>
                                        {user.status !== 'On The Way' ? (
                                            <button onClick={() => setSelectedParcel(user)} className="btn">Manage</button>
                                        ) : (
                                            <button className="btn" disabled>Manage</button>
                                        )}
                                    </td>
                                {/* <td>
                                    <button onClick={() => setSelectedParcel(user)} className="btn">Manage</button>
                                </td> */}
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedParcel && (
                <ManageParcel
                    parcel={selectedParcel}
                    onClose={() => setSelectedParcel(null)}
                    onUpdate={refetch}
                />
            )}
        </div>
    );
};

export default AllParcel;
