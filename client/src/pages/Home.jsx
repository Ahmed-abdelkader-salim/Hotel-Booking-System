import React from 'react'
import Hero from '../components/Hero'
import HotelList from '../components/HotelList'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
  return (
    <>
      <Hero />
      <RecommendedHotels />
      <HotelList />
      <ExclusiveOffers />
      <Testimonials />
      <Newsletter />
    </>
  )
}

export default Home
