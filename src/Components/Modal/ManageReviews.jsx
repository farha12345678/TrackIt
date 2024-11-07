import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";

const ManageReviews = ({ parcel, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // User data already available; no need to re-query within modal
  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      userName: user?.name, // Adjust according to user data structure
      userImage: user?.photoURL,
      userEmail: user?.email,
      rating,
      feedback,
      deliveryManId: parcel.deliveryManId,
      deliveryManEmail: parcel.deliveryManEmail,
    };

    axiosSecure.post('/review', reviewData)
      .then(() => {
        onClose(); // Close modal on successful review submission
      })
      .catch(error => console.error("Error submitting review:", error));
  };

  return (
    <Dialog open={!!parcel} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-30">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <DialogTitle className="text-2xl font-semibold text-gray-800 mb-4">
            Manage Parcel Review
          </DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={user?.photoURL || ""}
                readOnly
                className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Rate out of 5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Write your feedback here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Man ID</label>
              <input
                type="text"
                value={parcel.deliveryManId || ""}
                readOnly
                className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

ManageReviews.propTypes = {
  parcel: PropTypes.shape({
    deliveryManId: PropTypes.string,
    deliveryManEmail: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ManageReviews;
