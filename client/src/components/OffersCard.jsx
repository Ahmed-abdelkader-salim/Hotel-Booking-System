
import React from 'react'

const OffersCard = ({ item }) => {
  return (
    <div
      className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
      style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

      {/* Expiry badge */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
        Expires {item.expiryDate}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="inline-block bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {item.priceOff}% OFF
        </span>
        <h3 className="text-white font-medium text-lg leading-tight">{item.title}</h3>
        <p className="text-white/75 text-sm mt-1 line-clamp-2">{item.description}</p>
        <button className="mt-4 text-xs font-medium text-white underline underline-offset-2 hover:text-white/80 transition-all">
          Claim Offer →
        </button>
      </div>
    </div>
  )
}

export default OffersCard