import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';


const ManageParcel = ({ parcel, onClose, onUpdate }) => {
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
    const [approxDeliveryDate, setApproxDeliveryDate] = useState('');
   
    const axiosSecure = UseAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: { userType: 'Delivery Man' } // Change 'deliveryMan' to the userType you need
      });
      console.log(res.data);
      return res.data;
    }
  });

    const handleSubmit = async () => {
        await axiosSecure.put(`/parcel/${parcel._id}`, {
            ...parcel,
            status: 'On The Way',
            deliveryManId: selectedDeliveryMan,
            approxDeliveryDate
        });
       
        onUpdate();
        onClose();
       

    };

    return (
        <Dialog open={!!parcel} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-1/3 space-y-4 border bg-white p-12">
                    <DialogTitle className="font-bold">Manage The Parcel</DialogTitle>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Delivery Man</span>
                        </label>
                        <select
                            className="input input-bordered"
                            required
                            value={selectedDeliveryMan}
                            onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                        >
                            <option value="" disabled>Select Delivery Man</option>
                            {users.map(man => (
                                <option key={man._id} value={man._id}>{man.userName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Approximate Delivery Date</span>
                        </label>
                        <input
                            type="date"
                            className="input input-bordered"
                            value={approxDeliveryDate}
                            onChange={(e) => setApproxDeliveryDate(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button onClick={onClose} className="btn">Cancel</button>
                        <button onClick={handleSubmit} className="btn btn-primary">Assign</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

ManageParcel.propTypes = {
    parcel: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default ManageParcel;