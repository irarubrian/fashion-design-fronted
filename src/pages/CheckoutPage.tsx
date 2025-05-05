/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"
import DeliveryTrackingMap from "../components/DeliveryTrackingMap"

type DeliveryStatus = "processing" | "shipped" | "out-for-delivery" | "delivered"

const CheckoutPage: React.FC = () => {
  const { state } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("processing")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const handlePlaceOrder = () => {
    
    setShowPaymentModal(true)
  }

  const completeOrder = () => {
    setShowPaymentModal(false)
    setPaymentComplete(true)
    setOrderPlaced(true)
    setDeliveryStatus("processing")

    
    const deliveryDate = new Date(2025, 4, 8) // May 8, 2025

    
    setTimeout(() => setDeliveryStatus("shipped"), 20000) // 20 seconds
    setTimeout(() => setDeliveryStatus("out-for-delivery"), 40000) // 40 seconds
    setTimeout(() => setDeliveryStatus("delivered"), 180000) // 3 minutes
  }

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(e.target.id)
  }

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some items to your cart before checking out.</p>
          <Link to="/" className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
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
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                      checked={selectedPaymentMethod === "card"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="card" className="ml-3 flex items-center text-sm font-medium text-gray-700">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/179/179457.png"
                        alt="Credit Card"
                        className="h-6 w-auto mr-2"
                      />
                      Credit Card
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="paypal"
                      name="payment"
                      type="radio"
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                      checked={selectedPaymentMethod === "paypal"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="paypal" className="ml-3 flex items-center text-sm font-medium text-gray-700">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                        alt="PayPal"
                        className="h-6 w-auto mr-2"
                      />
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="mpesa"
                      name="payment"
                      type="radio"
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                      checked={selectedPaymentMethod === "mpesa"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label htmlFor="mpesa" className="ml-3 flex items-center text-sm font-medium text-gray-700">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png"
                        alt="M-PESA"
                        className="h-6 w-auto mr-2"
                      />
                      M-PESA
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
                <p className="text-gray-600">
                  Order #: <span className="font-medium">ELG-{Math.floor(Math.random() * 10000)}</span>
                </p>
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
                          src={item.image || "/placeholder.svg"}
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
                            {item.selectedColor && item.selectedSize && " | "}
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
                <p>${(state.totalPrice + 5.99 + state.totalPrice * 0.08).toFixed(2)}</p>
              </div>
            </div>

            {!orderPlaced ? (
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Place Order
              </button>
            ) : (
              <Link
                to="/"
                className="w-full mt-6 block text-center bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Continue Shopping
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modals */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            {selectedPaymentMethod === "card" && (
              <div>
                <h3 className="text-xl font-medium mb-4">Enter Credit Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPaymentMethod === "paypal" && (
              <div>
                <h3 className="text-xl font-medium mb-4">PayPal Checkout</h3>
                <div className="text-center mb-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                    alt="PayPal"
                    className="h-16 mx-auto mb-4"
                  />
                  <p className="text-gray-600">You will be redirected to PayPal to complete your payment.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPaymentMethod === "mpesa" && (
              <div>
                <h3 className="text-xl font-medium mb-4">M-PESA Payment</h3>
                <div className="text-center mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png"
                    alt="M-PESA"
                    className="h-16 mx-auto mb-4"
                  />
                  <p className="text-gray-600">Enter your M-PESA details to complete payment.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="254 7XX XXX XXX"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={completeOrder} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
