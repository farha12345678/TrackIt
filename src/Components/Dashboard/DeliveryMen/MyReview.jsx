import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
};

const MyReview = () => {
    const { user } = useContext(AuthContext)

    const axiosSecure = UseAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-review/${user?.email}`);
            console.log(res.data);
            return res.data;

        }
    })
    console.log(parcels);

    return (
        <div className="">
            <div>
                <h1 className="italic text-4xl font-bold text-center mt-16 mb-10">Review</h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-20  my-10">
                {parcels.map((man) => (
                    <div key={man.deliveryManId} className="card w-96  bg-base-100 shadow-xl">
                        <figure><img className="h-40 w-40 rounded-full" src={man.userImage} alt={man.name} /></figure>
                        <div className="card-body text-center text-xl font-bold">
                            <h1>Review Givers Name: {man.userName}</h1>
                            <h2 className="">Review Giving Date: {formatDate(man.reviewGivingDate)}</h2>
                            <p>Parcels Delivered: {man.rating}/5</p>
                            <p>Average Rating: {man.feedback}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReview;