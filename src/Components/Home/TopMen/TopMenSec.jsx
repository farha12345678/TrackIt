import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";

import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";

const TopMenSec = () => {
  const axiosPublic = UseAxiosPublic();
  const [topDeliveryMen, setTopDeliveryMen] = useState([]);

  const { data: parcelsData = [] } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosPublic.get('/parcel');
      return res.data;
    },

  });

  const { data: reviewsData = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosPublic.get('/review');
      return res.data;
    },

  });


  const { data: deliveryMenData = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users', {
        params: { userType: 'Delivery Man' }
      });

      return res.data;
    },

  });



  useEffect(() => {
    const calculateTopDeliveryMen = () => {
      if (parcelsData.length === 0 || reviewsData.length === 0 || deliveryMenData.length === 0) return;

      // Calculate parcels delivered by each delivery man
      const parcelsDelivered = {};
      parcelsData.forEach(parcel => {
        if (parcelsDelivered[parcel.deliveryManId]) {
          parcelsDelivered[parcel.deliveryManId]++;
        } else {
          parcelsDelivered[parcel.deliveryManId] = 1;
        }
      });

      // Calculate average ratings for each delivery man
      const averageRatings = {};
      reviewsData.forEach(review => {
        if (averageRatings[review.deliveryManId]) {
          averageRatings[review.deliveryManId].totalRating += parseInt(review.rating);
          averageRatings[review.deliveryManId].count++;
        } else {
          averageRatings[review.deliveryManId] = {
            totalRating: parseInt(review.rating),
            count: 1
          };
        }
      });

      // Prepare top delivery men data with names and images from deliveryMenData
      const topMenData = Object.keys(parcelsDelivered).map(deliveryManId => {
        const deliveryMan = deliveryMenData.find(user => user._id === deliveryManId);
        if (!deliveryMan) return null;
        console.log('man', deliveryMan);
        const name = deliveryMan.userName || 'Unknown';
        const image = deliveryMan.userPhoto || 'https://via.placeholder.com/150';
        const parcels = parcelsDelivered[deliveryManId];
        const averageReview = (averageRatings[deliveryManId] ? (averageRatings[deliveryManId].totalRating / averageRatings[deliveryManId].count).toFixed(2) : 0);

        return {
          deliveryManId,
          name,
          image,
          parcelsDelivered: parcels,
          averageReview
        };
      }).filter(Boolean); // Filter out any null values

      // Sort top delivery men by parcels delivered and average review
      topMenData.sort((a, b) => {
        if (b.parcelsDelivered === a.parcelsDelivered) {
          return b.averageReview - a.averageReview;
        }
        return b.parcelsDelivered - a.parcelsDelivered;
      });

      // Set the top 3 delivery men
      setTopDeliveryMen(topMenData.slice(0, 3));
    };

    calculateTopDeliveryMen();
  }, [parcelsData, reviewsData, deliveryMenData, axiosPublic]);
  console.log('top', topDeliveryMen);
  return (
    <div className="mx-20">
      <div>
        <h1 className="italic text-4xl font-bold text-center mt-16 mb-10">The Top  Delivery Men</h1>
      </div>


      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-10">
        {topDeliveryMen.map((man) => (
          <div key={man.deliveryManId} className="card w-96 bg-base-100 shadow-xl">
            <figure><img className="h-40 w-40 rounded-full" src={man.image} alt={man.name} /></figure>
            <div className="card-body text-center text-xl font-bold">
              <h2 className="  text-blue-600">{man.name}</h2>
              <p>Parcels Delivered: {man.parcelsDelivered}</p>
              <p>Average Rating: {man.averageReview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMenSec;
