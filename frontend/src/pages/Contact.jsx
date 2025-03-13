import React, {useState, useEffect} from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/Newsletter'
import LoadingWrapper from '../components/LoadingWrapper'




const Contact = () => {
  
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
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] rounded-3xl shadow-2xl shadow-gray-400' src={assets.contact_img} alt="" />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Willims Station <br /> Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Tel : (415) 555-0132 <br /> Email: admin@forever.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border bg-black text-white border-black px-8 py-4 rounded-b-4xl text-sm hover:bg-white hover:text-black translate-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox />
    </div>
</LoadingWrapper>

  )
}

export default Contact
