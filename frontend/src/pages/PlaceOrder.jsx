import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === itemId));
          if (itemInfo) {
            itemInfo.quantity = cartItems[itemId];
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const responseCod = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
      if (responseCod.data.success) {
        toast.success(responseCod.data.message);
        // Clear cart after successful order
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error(responseCod.data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left Side */}
      <div className='w-full sm:w-1/2 flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>DELIVERY INFORMATION</h2>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <input
              type="text"
              name="firstName"
              placeholder='First Name'
              required
              value={formData.firstName}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
            <input
              type="text"
              name="lastName"
              placeholder='Last Name'
              required
              value={formData.lastName}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder='Email'
            required
            value={formData.email}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <input
            type="text"
            name="street"
            placeholder='Street Address'
            required
            value={formData.street}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <input
            type="text"
            name="city"
            placeholder='City'
            required
            value={formData.city}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <div className='flex flex-col sm:flex-row gap-4'>
            <input
              type="text"
              name="state"
              placeholder='State/Province'
              required
              value={formData.state}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
            <input
              type="text"
              name="zipcode"
              placeholder='Postal/Zip Code'
              required
              value={formData.zipcode}
              onChange={onChangeHandler}
              className='w-full sm:w-1/2 p-2 border outline-none'
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder='Country'
            required
            value={formData.country}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
          <input
            type="text"
            name="phone"
            placeholder='Phone Number'
            required
            value={formData.phone}
            onChange={onChangeHandler}
            className='w-full p-2 border outline-none'
          />
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full sm:w-1/2 flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold'>CART TOTALS</h2>
          <div className='flex justify-between border-b py-2'>
            <p>Subtotal</p>
            <p>PKR {getCartAmount()}</p>
          </div>
          <div className='flex justify-between border-b py-2'>
            <p>Shipping Fee</p>
            <p>PKR {delivery_fee}</p>
          </div>
          <div className='flex justify-between py-2'>
            <p className='font-semibold'>Total</p>
            <p className='font-semibold'>PKR {getCartAmount() + delivery_fee}</p>
          </div>
          <div className='mt-4'>
            <h2 className='text-xl font-semibold'>PAYMENT METHOD</h2>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  value="cod"
                  checked
                  readOnly
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          </div>

          <button type="submit" className='bg-black text-white py-2 px-4 w-full'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;