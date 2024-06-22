import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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
        <div>

        </div>
    );
};

export default MyReview;