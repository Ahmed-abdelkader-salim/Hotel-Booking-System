import React, { useState } from 'react'
import { assets } from '../assets/assets'
import HotelCard from '../components/HotelCard'
import Title from '../components/Title'
import useRooms from '../hooks/useRooms'
import { useSearchParams } from 'react-router-dom'
 
const SORT_OPTIONS = ['Price: Low to High', 'Price: High to Low', 'Newest First']
const PRICE_RANGES = ['0 - 500', '500 - 1000', '1000 - 2000', '2000+']
const ROOM_TYPES = ['Single Bed', 'Double Bed', 'Suite']

const AllRooms = () => {
  const {rooms, loading} = useRooms();

  const [searchParams] = useSearchParams();
  const destination = searchParams.get('destination') || '';
  const [selectedSort, setSelectedSort] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

    if (loading) return <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
    </div>
  const filtered = [...rooms]
        .filter((r) => {
            console.log("hotel city:", r.hotel.city, "destination:", destination)
            return !destination || r.hotel.city.toLowerCase() === destination.toLowerCase()
        })
        .filter((r) => !selectedType || r.roomType === selectedType)
        .filter((r) => {
            if (!selectedPrice) return true
            const price = r.pricePerNight
            if (selectedPrice === '0 - 500') return price >= 0 && price <= 500
            if (selectedPrice === '500 - 1000') return price > 500 && price <= 1000
            if (selectedPrice === '1000 - 2000') return price > 1000 && price <= 2000
            if (selectedPrice === '2000+') return price > 2000
        })
        .sort((a, b) => {
      if (selectedSort === 'Price: Low to High') return a.pricePerNight - b.pricePerNight
      if (selectedSort === 'Price: High to Low') return b.pricePerNight - a.pricePerNight

      return 0
  })


  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-20 min-h-screen">

      <Title
        title="All Rooms"
        subTitle="Browse our full collection of rooms and suites across top destinations."
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-12">

        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0">

          {/* Mobile toggle */}
          <button
            className="flex lg:hidden items-center gap-2 text-sm font-medium border border-gray-300 px-4 py-2 rounded-full mb-4"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <img src={assets.searchIcon} alt="filter" className="w-4 h-4" />
            {filtersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className={`flex flex-col gap-6 ${filtersOpen ? 'flex' : 'hidden'} lg:flex`}>

            {/* Sort */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-3">Sort By</p>
              <div className="flex flex-col gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      checked={selectedSort === opt}
                      onChange={() => setSelectedSort(opt)}
                      className="accent-black"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Price Range */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-3">Price Range</p>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((range) => (
                  <label key={range} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice === range}
                      onChange={() => setSelectedPrice(range)}
                      className="accent-black"
                    />
                    ${range}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Room Type */}
            <div>
              <p className="text-sm font-medium text-gray-900 mb-3">Room Type</p>
              <div className="flex flex-col gap-2">
                {ROOM_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                      className="accent-black"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Clear */}
            <button
              onClick={() => { setSelectedSort(''); setSelectedPrice(''); setSelectedType('') }}
              className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 text-left transition-all"
            >
              Clear all filters
            </button>

          </div>
        </div>

        {/* Rooms Grid */}
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-6">{filtered.length} rooms found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((room, index) => (
              <HotelCard key={room._id} room={room} index={index} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              No rooms match your filters.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default AllRooms