// OffersList.jsx
import React from 'react'
import { exclusiveOffers } from '../assets/assets'
import OffersCard from './OffersCard'

const OffersList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
      {exclusiveOffers.map((item) => (
        <OffersCard key={item._id} item={item} />
      ))}
    </div>
  )
}

export default OffersList