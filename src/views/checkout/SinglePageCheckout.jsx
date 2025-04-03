import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollTop, useDocumentTitle } from '@/hooks';
import { BasketItem } from '@/components/basket';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Truck, ShoppingBag } from 'lucide-react';

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
    // ... (keep the existing handlePlaceOrder logic)
  };

  return (
    <div className="checkout-page min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h2 className="text-3xl font-extrabold">Checkout</h2>
          <p className="mt-2">Complete your order</p>
        </div>
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
            <Form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="order-summary">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <ShoppingBag className="mr-2" /> Order Summary
                  </h3>
                  <div className="space-y-4 mb-4">
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
                  </div>
                  <div className="text-right font-bold text-lg">
                    Subtotal: ${subtotal.toFixed(2)}
                  </div>
                </section>

                <section className="shipping-info">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Truck className="mr-2" /> Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Field name="fullname" className="checkout-input" placeholder="Full Name" />
                      {errors.fullname && touched.fullname && <div className="text-red-500 text-sm mt-1">{errors.fullname}</div>}
                    </div>
                    <div>
                      <Field name="email" type="email" className="checkout-input" placeholder="Email" />
                      {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>
                    <div>
                      <Field name="address" className="checkout-input" placeholder="Shipping Address" />
                      {errors.address && touched.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                    </div>
                    <div>
                      <Field name="mobile" className="checkout-input" placeholder="Mobile Number" />
                      {errors.mobile && touched.mobile && <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>}
                    </div>
                  </div>
                </section>
              </div>

              <div className="mt-8 text-center">
                <button type="submit" className="checkout-button">
                  <CreditCard className="mr-2" /> Place Order
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SinglePageCheckout;
