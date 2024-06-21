import { useContext } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const ManageReview = ({ onClose, parcel }) => {

    const { user } = useContext(AuthContext)

    const axiosSecure = UseAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            
           return res.data;

        }
    })

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensure user email is available before making the request
    });
    
    const handleReview = async (e) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value;
        const rating = form.querySelector('input[name="rating-3"]:checked').value;
        const deliveryManId = form.id.value; 
        const addReview = {
            feedback,
            rating,
            deliveryManId,
           
        };

        try {
            const response = await axiosSecure.post('/reviews', addReview);
            if (response.data.insertedId) {
                Swal.fire("Review Added Successfully!");
                console.log(response.data);
            }
            onClose();
        } catch (error) {
            console.error('Error adding review:', error);
            Swal.fire("Error", "Failed to add review", "error");
        }
    };
    // const handleReview = e => {
    //     e.preventDefault();
    //     const form = e.target
    //     const name = users?.userName
    //     const photo = users?.userPhoto


    //     const addReview = {}
    //     console.log();
    //     // send data to the server

    //     axiosSecure.post('/reviews', addReview)
    //         .then(data => {
    //             if (data.data.insertedId) {
    //                 Swal.fire("Review Added Successfully!");

    //                 console.log(data.data);
    //             }
    //             onClose()
    //         })


    // }

   
   return (
        <div>
            <Dialog open={!!parcel} onClose={onClose} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-1/3 space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">Give a review</DialogTitle>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your name</span>
                            </label>
                            <input
                                type="name" name="name"
                                className="input input-bordered"
                                placeholder={users?.userName} readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Photo</span>
                            </label>
                            <input
                                type="photo" name="photo"
                                className="input input-bordered" readOnly
                                placeholder={users?.userPhoto}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Give Rating</span>
                            </label>
                            <div className="rating gap-1">
                                <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
                                <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" checked />
                                <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400" />
                                <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400" />
                                <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Give Feedback</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered"
                                name="feedback"
                                placeholder="Write Your Feedback"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Delivery Man ID</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered"
                                name="id"
                                placeholder={parcels?.deliveryManId}
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={onClose} className="btn">Cancel</button>
                            <button onClick={handleReview} className="btn btn-primary">Submit</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
};

export default ManageReview;