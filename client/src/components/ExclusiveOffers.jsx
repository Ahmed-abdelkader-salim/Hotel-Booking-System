import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import OffersList from './OffersList'

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
            {/* text */}
        <div className='flex flex-col md:flex-row items-center justify-between w-full'>
            <Title 
            title="Exclusive Offers"
            align="left"
            subTitle="Discover our latest exclusive 
            offers and deals. Discover our latest exclusive 
            offers and deals.Discover our latest exclusive 
            offers and deals."/>
            <button className='flex items-center gap-3 cursor-pointer group font-medium'>
                    View All Offers
                <img
                width={16}
                src={assets.arrowIcon}
                alt="go to"
                className="group-hover:translate-x-1 transition-transform duration-200"
                />
            </button>
        </div>
      {/*Offer cards list */}
      <OffersList/>
    </div>
  )
}

export default ExclusiveOffers
