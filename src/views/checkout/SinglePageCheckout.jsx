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
      <h2 className="text-2xl font-bold text-center mb-6">Single Page Checkout</h2>

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
        {() => (
          <Form>
            {/* Order Summary */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">🛒 Order Summary</h3>
              {basket.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                basket.map((product) => (
                  <BasketItem
                    key={product.id}
                    product={product}
                    basket={basket}
                    dispatch={dispatch}
                  />
                ))
              )}
              <div className="text-right mt-2">
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </div>
            </section>

            {/* Shipping Details */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">📦 Shipping Information</h3>
              <ShippingForm />
            </section>

            {/* Payment */}
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">💳 Payment</h3>
              <CreditPayment />
              <Total isInternational={false} subtotal={subtotal} />
            </section>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SinglePageCheckout;
