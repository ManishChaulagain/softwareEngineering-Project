import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollTop, useDocumentTitle } from '@/hooks';
import { BasketItem } from '@/components/basket';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutSchema = Yup.object().shape({
  fullname: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  mobile: Yup.string().required('Mobile number is required')
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

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Stripe API error:', errorText);
        alert('Checkout session creation failed.');
        return;
      }

      const session = await res.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (err) {
      console.error('Stripe Checkout Error:', err);
      alert('Something went wrong.');
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
          mobile: ''
        }}
        validationSchema={CheckoutSchema}
        onSubmit={handlePlaceOrder}
      >
        {({ errors, touched }) => (
          <Form>
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
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

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
              <div className="mb-2">
                <Field name="fullname" className="input" placeholder="Full Name" />
                {errors.fullname && touched.fullname && <div className="text-red-500">{errors.fullname}</div>}
              </div>
              <div className="mb-2">
                <Field name="email" type="email" className="input" placeholder="Email" />
                {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
              </div>
              <div className="mb-2">
                <Field name="address" className="input" placeholder="Shipping Address" />
                {errors.address && touched.address && <div className="text-red-500">{errors.address}</div>}
              </div>
              <div className="mb-2">
                <Field name="mobile" className="input" placeholder="Mobile Number" />
                {errors.mobile && touched.mobile && <div className="text-red-500">{errors.mobile}</div>}
              </div>
            </section>

            <div className="text-center">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
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