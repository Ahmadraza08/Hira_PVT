// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title'
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';

// const Cart = () => {

//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     const tempData = [];
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         if (cartItems[items][item] > 0) {
//           tempData.push({
//             _id: items,
//             size: item,
//             quantity: cartItems[items][item]
//           })
//         }
//       }
//     }
//     setCartData(tempData);
//   }, [cartItems])
//   return (
//     <div className='border-t pt-14'>

//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         {
//           cartData.map((item, index) => {

//             const productData = products.find((product) => product._id === item._id);

//             return (
//               <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4'>
//                 <div className='flex items-start gap-6'>
//                   <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
//                   <div>
//                     <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
//                     <div className='flex items-center gap-5 mt-2'>
//                       <p>{currency}{productData.price}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))} className='border-gray-300 border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
//                 <img onClick={() => updateQuantity(item._id, 0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer ' alt="" />
//               </div>
//             )

//           })
//         }
//       </div>

//       <div className='flex justify-end my-20'>
//         <div className=' w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className="w-full text-end">
//             <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 py-3 px-8'>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import LoadingWrapper from '../components/LoadingWrapper'


const Cart = () => {
  const [loading, setLoading] = useState(true);

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = Object.keys(cartItems)
        .filter((itemId) => cartItems[itemId] > 0)
        .map((itemId) => ({ _id: itemId, quantity: cartItems[itemId] }));
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
      setCartData((prevCart) =>
        prevCart.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleDelete = (itemId) => {
    updateQuantity(itemId, 0);
    setCartData((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  return (

    <LoadingWrapper isLoading={loading}>
      <div className='border-t pt-14'>
        <div className='text-2xl mb-3'>
          <Title text1={'YOUR'} text2={'CART'} />
        </div>

        <div>
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4'
                >
                  <div className='flex items-start gap-6'>
                    <img src={productData.image[0]} className='w-16 sm:w-20' alt={productData.name} />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <p>{currency}{productData.price}</p>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <input
                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                    className='border-gray-300 border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                    type='number'
                    min={1}
                    value={item.quantity}
                  />

                  {/* Delete Button */}
                  <img
                    onClick={() => handleDelete(item._id)}
                    src={assets.bin_icon}
                    className='w-4 mr-4 sm:w-5 cursor-pointer'
                    alt='Delete'
                  />
                </div>
              );
            })
          ) : (
            <p className='text-center text-gray-500 mt-10'>Your cart is empty.</p>
          )}
        </div>

        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button
                onClick={() => navigate('/place-order')}
                className='bg-black text-white text-sm my-8 py-3 px-8'
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );

};

export default Cart;
