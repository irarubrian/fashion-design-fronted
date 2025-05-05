import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import DeliveryTrackingMap from '../components/DeliveryTrackingMap';

type DeliveryStatus = 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';

const CheckoutPage: React.FC = () => {
  const { state } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>('processing');

  // Simulate order placement
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setDeliveryStatus('processing');

    // Simulate order status updates
    setTimeout(() => setDeliveryStatus('shipped'), 3000);
    setTimeout(() => setDeliveryStatus('out-for-delivery'), 6000);
    setTimeout(() => setDeliveryStatus('delivered'), 9000);
  };

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some items to your cart before checking out.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          {!orderPlaced ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    />
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="card"
                      name="payment"
                      type="radio"
                      className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit Card
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="paypal"
                      name="payment"
                      type="radio"
                      className="h-4 w-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300"
                    />
                    <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                      PayPal
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="text-center py-4">
                <h2 className="text-xl font-medium mb-2">Thank you for your order!</h2>
                <p className="text-gray-600 mb-4">Your order has been placed and is being processed.</p>
                <p className="text-gray-600">Order #: <span className="font-medium">ELG-{Math.floor(Math.random() * 10000)}</span></p>
              </div>

              {/* Delivery Tracking Map */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Track Your Delivery</h3>
                <DeliveryTrackingMap status={deliveryStatus} />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

            {!orderPlaced && (
              <div className="max-h-64 overflow-y-auto mb-4">
                <ul className="divide-y divide-gray-200">
                  {state.items.map((item) => (
                    <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-3 flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-3 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-1">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedColor && item.selectedSize && ' | '}
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-xs">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">${state.totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium">$5.99</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Tax</p>
                <p className="font-medium">${(state.totalPrice * 0.08).toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>${(state.totalPrice + 5.99 + (state.totalPrice * 0.08)).toFixed(2)}</p>
              </div>
            </div>

            {!orderPlaced ? (
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-burgundy-600 text-white py-3 px-4 rounded-md hover:bg-burgundy-700 transition-colors"
              >
                Place Order
              </button>
            ) : (
              <Link
                to="/"
                className="w-full mt-6 block text-center bg-burgundy-600 text-white py-3 px-4 rounded-md hover:bg-burgundy-700 transition-colors"
              >
                Continue Shopping
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;