import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center font-bold text-4xl my-10">
                <h1>My Profile</h1>
            </div>

            <div className="card w-full max-w-sm shadow-2xl bg-base-100 mx-auto mb-10">
                <form className="card-body">
                    {/* Profile Photo */}
                    <div className="form-control text-center">
                        <label className="label">
                            <span className="label-text">Your Photo</span>
                        </label>
                        <img 
                            className="rounded-full w-40 h-40 mx-auto mb-4" 
                            src={users?.userPhoto || "https://via.placeholder.com/150"} 
                            alt="User Photo"
                        />
                    </div>

                    {/* Upload New Photo */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload a new picture</span>
                        </label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="input input-bordered" 
                        />
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input 
                            type="email" 
                            value={users?.userEmail || ''} 
                            readOnly 
                            className="input input-bordered" 
                        />
                    </div>

                    {/* Update Button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;
