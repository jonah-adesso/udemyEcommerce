import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import agent from '../../app/api/agent';
import { useAppDispatch } from '../../app/store/configureStore';
import { setBasket } from '../basket/basketSlice';
import LoadingComponent from '../../app/layout/LoadingComponent';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe(
  'pk_test_51Mo1JNHg5sd7HO3LvTn5ZLTCmiAa7aPARGNTrOkH0dmLLoxCo9HbJB7y7pyY9L87NUdKOY1Y5XQE7BujEaAkjcF000yFvknLRj'
);
export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then((response) => {
        dispatch(setBasket(response));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading || !stripePromise)
    return <LoadingComponent message="Loading checkout" />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
