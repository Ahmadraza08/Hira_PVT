import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'
import LoadingWrapper from '../components/LoadingWrapper'

const Home = () => {

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
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <Newsletter />
      </div>

    </LoadingWrapper>
  )
}

export default Home