import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Dialog,  DialogPanel,  DialogTitle } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

const ManageReviews = ({ parcel, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  
 
  const { data: users = [] } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      console.log('users', res.data);
      return res.data;
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      userName: users?.userName,
      userImage: users?.userPhoto,
      userEmail : users?.userEmail,
      rating,
      feedback,
      deliveryManId: parcel.deliveryManId,
      email : parcel.deliveryManEmail
    };

    axiosSecure.post('/review', reviewData);
    onClose(); 
  };

  return (
    <Dialog open={!!parcel} onClose={onClose} className="relative z-50">
    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-1/3 space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Manage The Parcel</DialogTitle>
            <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={users?.userName} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image</label>
             <input type="text" value={users?.userPhoto} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Feedback</label>
              <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Delivery Man ID</label>
              <input type="text" value={parcel.deliveryManId} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Submit</button>
            </div>
          </form>
        </DialogPanel>
    </div>
</Dialog>
  );
};

export default ManageReviews;