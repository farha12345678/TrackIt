import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const TopMenSec = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/deliveryMen');
            console.log(res.data);
            return res.data;

        }


    })
    return (
        <div className="mx-20">
            <div>
                <h1 className="italic text-4xl font-bold text-center mt-16 mb-10">Our Top Rated Delivery Men</h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 my-10">
                {
                    users?.slice(0,3).map(user =>
                        <div key={user._id} className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={user.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{user.name}</h2>
                                <p>{user.parcelsDelivered}</p>
                                <p>{user.averageReview}</p>
                                
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TopMenSec;