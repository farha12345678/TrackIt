import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('your_stripe_publishable_key');
const CheckOut = ({ pay }) => {


    return (
        <div>
            <div>
               
            </div>
        </div>
    );
};

const CheckoutPage = () => (
    <Elements stripe={stripePromise}>
      <CheckOut />
    </Elements>
  );

export default CheckoutPage;