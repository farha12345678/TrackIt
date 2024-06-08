import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";


const MyDeliveryList = () => {
    const { user } = useContext(AuthContext)
  
    const axiosSecure = UseAxiosSecure();
    const { data: parcels , error, isLoading } = useQuery({
        queryKey: [user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            console.log(res.data);
            console.log(parcels);
            return res.data;
            
        }
        
        
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching delivery men</div>;




    return (
        <div>

        </div>
    );
};


export default MyDeliveryList;
