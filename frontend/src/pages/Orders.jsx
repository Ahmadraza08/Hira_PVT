import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import LoadingWrapper from '../components/LoadingWrapper'



const Orders = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData([...allOrdersItem].reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (

    <LoadingWrapper isLoading={loading}>
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>

        <div>
          {orderData.length === 0 ? (
            <p>No Orders Found</p>
          ) : (
            orderData.map((item, index) => (
              <div key={index} className="py-4 border-gray-300 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-6 text-sm">
                  <img src={item.image?.[0] || 'default-image.jpg'} className="w-16 sm:w-20" alt={item.name} />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                      <p>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="mt-1">Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className="mt-1">Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm cursor-pointer">Track Order</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Orders;
