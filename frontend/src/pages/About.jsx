import React,{useState, useEffect} from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/Newsletter'
import LoadingWrapper from '../components/LoadingWrapper'


const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <LoadingWrapper isLoading={loading}>

      <div>
        <div className='text-2xl text-center pt-8 bcdorder-t'>
          <Title text1={'ABOUT'} text2={'US'} />
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img src={assets.hero} className='w-full rounded-3xl shadow-2xl shadow-gray-400 md:max-w-[450px]' alt="" />

          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Hira Electronics was founded with a passion for delivering high-quality home appliances and electronics at unbeatable prices. Our goal is to provide a seamless shopping experience where customers can easily explore, compare, and purchase the best products for their needs.</p>
            <p>Since our establishment, we have worked tirelessly to build a diverse collection of top-rated ACs, refrigerators, washing machines, LED TVs, and other essential home appliances. We source our products from trusted brands, ensuring reliability, durability, and performance.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>At Hira Electronics, our mission is to offer customers the perfect combination of quality, affordability, and convenience. We strive to provide a smooth and hassle-free shopping journey, from product selection to doorstep delivery, with a commitment to customer satisfaction.</p>
          </div>
        </div>

        <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>We carefully select and verify each product to ensure it meets our high-quality standards, providing you with durable and reliable home appliances.</p>
          </div>

          <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>Our user-friendly website and hassle-free ordering process make shopping effortless, whether you're at home or on the go.</p>
          </div>

          <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Our dedicated team is always ready to assist you, ensuring a smooth and satisfying shopping experience from selection to delivery.</p>
          </div>
        </div>

        <NewsletterBox />
      </div>
    </LoadingWrapper>
  )
}

export default About