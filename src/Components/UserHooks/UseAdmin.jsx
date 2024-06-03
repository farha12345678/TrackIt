import { useContext } from "react";


import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const UseAdmin = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = UseAxiosSecure();
    const { data: isAdmin } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.Admin;
            
        }
        
        
    })
    return [isAdmin ]
};

export default UseAdmin;