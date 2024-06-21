import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MyProfile = () => {
    const { user } = useContext(AuthContext)

    const axiosSecure = UseAxiosSecure();
    const { data: users = [] } = useQuery({
      queryKey: [user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/${user?.email}`);
        console.log(res.data);
  
        return res.data;
  
      }
  
  
    })
    return (
        <div>
            <div className="text-center font-bold text-4xl my-10">
                <h1>My Profile</h1>
            </div>
             <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto mb-10">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text ">Your Photo</span>
          </label>
          <img className="rounded-full w-72 h-72" src={users?.userPhoto} alt="" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload a new picture</span>
          </label>
          <input type="email" placeholder={users?.userEmail} readOnly className="input input-bordered"  />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input type="email" placeholder={users?.userEmail} readOnly className="input input-bordered"  />
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
        </div>
    );
};

export default MyProfile;