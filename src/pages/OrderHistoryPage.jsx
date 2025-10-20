import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (!userId || !token) {
          setError('User not logged in or token not found.');
          setLoading(false);
          return;
        }
        const response = await axios.get(`/api/orders/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <SecondaryHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-semibold text-gray-700">Loading orders...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <SecondaryHeader />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-semibold text-red-600">Error: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <SecondaryHeader />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Your Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center text-lg sm:text-xl text-gray-600 py-10">
            <p>You have no orders yet.</p>
            <p className="mt-4">Start shopping to place your first order!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">Order ID: <span className="font-normal text-gray-600 text-base sm:text-lg">{order._id}</span></h2>
                <p className="text-gray-700 text-sm sm:text-base mb-1">Order Placed On: <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                {order.expectedDeliveryDate && (
                  <p className="text-gray-700 text-sm sm:text-base mb-1">Expected Delivery: <span className="font-medium">{new Date(order.expectedDeliveryDate).toLocaleDateString()}</span></p>
                )}
                <p className="text-gray-700 text-sm sm:text-base mb-1">
                  {order.deliveredAt ? (
                    <span>Delivered On: <span className="font-medium">{new Date(order.deliveredAt).toLocaleDateString()}</span></span>
                  ) : (
                    <span className="font-medium text-yellow-600">Not Delivered Yet</span>
                  )}
                </p>
                <p className="text-gray-700 text-lg sm:text-xl mb-4">Total Amount: <span className="font-bold text-green-600">₹{(order.totalPrice || 0).toFixed(2)}</span></p>
                <h3 className="text-lg sm:text-xl font-medium text-gray-800 mt-3 sm:mt-4 mb-2">Items:</h3>
                <ul className="list-disc pl-5 space-y-2 sm:space-y-3">
                  {order.orderItems.map((item) => (
                    <li key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-50 p-3 rounded-md">
                      <img src={item.image} alt={item.productId?.name || 'Product Image'} className="w-16 h-16 object-cover rounded-md border border-gray-200 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-base sm:text-lg font-medium text-gray-800">{item.productId?.name || 'Unknown Product'}</span>
                        <p className="text-gray-600 text-sm sm:text-base">Quantity: {item.quantity}</p>
                        <p className="text-gray-600 text-sm sm:text-base">Price: <span className="font-semibold">₹{(item.price || 0).toFixed(2)} each</span></p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderHistoryPage;
