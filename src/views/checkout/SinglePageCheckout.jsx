import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollTop, useDocumentTitle } from '@/hooks';
import { BasketItem } from '@/components/basket';
import ShippingForm from './single/ShippingForm';
import CreditPayment from './single/CreditPayment';
import Total from './single/Total';
import { loadStripe } from '@stripe/stripe-js';
console.log('ShippingForm:', ShippingForm);
console.log('BasketItem:', BasketItem);
console.log('Total:', Total);
// Stripe publishable key from Vercel env

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const CheckoutSchema = Yup.object().shape({
  fullname: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  mobile: Yup.string().required('Mobile number is required'),
  isInternational: Yup.boolean()
});

const SinglePageCheckout = () => {
  useScrollTop();
  useDocumentTitle('Checkout | Rm Store');

  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const subtotal = basket.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async (values) => {
    const stripe = await stripePromise;

    try {
      const lineItems = basket.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems })
      });

      const session = await res.json();

      if (session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        alert('Failed to create Stripe session.');
      }
    } catch (err) {
      console.error('Stripe Checkout Error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="checkout p-4 max-w-3xl mx-auto">
       <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>
       <Formik
      initialValues={{
        fullname: '',
        email: '',
        address: '',
        mobile: '',
        isInternational: false,
        cardnumber: '',
        expiry: '',
        ccv: '',
        type: 'stripe'
      }}
      validationSchema={CheckoutSchema}
      onSubmit={handlePlaceOrder}
    >
    </Formik>
    </div>
  );
};

export default SinglePageCheckout;
