// src/BookParcel.js
import { useContext, useState } from 'react';
import MapComponent from './MapComponent';

import { AuthContext } from '../../../Providers/AuthProvider';


const BookForm = () => {

    const {user} = useContext(AuthContext)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [parcelType, setParcelType] = useState('');
    const [parcelWeight, setParcelWeight] = useState(0);
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [price, setPrice] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const calculatePrice = (weight) => {
        if (weight <= 1) return 50;
        if (weight <= 2) return 100;
        return 150;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setPrice(calculatePrice(parcelWeight));
        setSubmitted(true);
    };

    return (
        <div className="BookParcel">
            <h2>Book a Parcel</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={user?.name} readOnly />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={user?.email} readOnly />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Parcel Type:</label>
                    <input
                        type="text"
                        value={parcelType}
                        onChange={(e) => setParcelType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Parcel Weight (kg):</label>
                    <input
                        type="number"
                        value={parcelWeight}
                        onChange={(e) => setParcelWeight(parseFloat(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Receiver’s Name:</label>
                    <input
                        type="text"
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Receiver Phone Number:</label>
                    <input
                        type="text"
                        value={receiverPhoneNumber}
                        onChange={(e) => setReceiverPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Parcel Delivery Address:</label>
                    <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Requested Delivery Date:</label>
                    <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Delivery Address Latitude:</label>
                    <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        pattern="^-?\d{1,3}\.\d+$"
                        required
                    />
                </div>
                <div>
                    <label>Delivery Address Longitude:</label>
                    <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        pattern="^-?\d{1,3}\.\d+$"
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" value={price} readOnly />
                </div>
                <button type="submit">Book</button>
            </form>
            {submitted && (
                <div>
                    <h3>Parcel Details:</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {phoneNumber}</p>
                    <p>Parcel Type: {parcelType}</p>
                    <p>Parcel Weight: {parcelWeight} kg</p>
                    <p>Receiver’s Name: {receiverName}</p>
                    <p>Receiver Phone Number: {receiverPhoneNumber}</p>
                    <p>Parcel Delivery Address: {deliveryAddress}</p>
                    <p>Requested Delivery Date: {deliveryDate}</p>
                    <p>Delivery Address Latitude: {latitude}</p>
                    <p>Delivery Address Longitude: {longitude}</p>
                    <p>Price: {price} Tk</p>
                    <MapComponent latitude={parseFloat(latitude)} longitude={parseFloat(longitude)} />
                </div>
            )}
        </div>
    );
};


export default BookForm;
