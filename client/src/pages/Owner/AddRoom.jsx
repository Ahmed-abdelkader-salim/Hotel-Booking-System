import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import useAddRoom from '../../hooks/useAddRoom' 
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const amenitiesList = [
    'Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'
]

const AddRoom = () => {
    const {addRoom, loading} = useAddRoom();
    const navigate = useNavigate();

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [form, setForm] = useState({
        roomType: '',
        pricePerNight: '',
        amenities: [],
    })

    const handleImage = (e, slot) => {
        const file = e.target.files[0]
        if (file) setImages(prev => ({ ...prev, [slot]: file }))
    }

    const toggleAmenity = (amenity) => {
        setForm(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }))
    }

        const handleSubmit = async (e) => { 
        e.preventDefault()

       
        const imageFiles = Object.values(images).filter(Boolean)
        if (imageFiles.length === 0) {
            return toast.error("Please upload at least one image")
        }

        const success = await addRoom({
            roomType: form.roomType,
            pricePerNight: form.pricePerNight,
            amenities: form.amenities,
            images: imageFiles
        })

        if (success){
            toast.success("Room added successfully");
            navigate('/owner/listRoom')  
        } 
    }

    return (
        <div className="px-6 md:px-10 pb-20">

            <Title title="Add Room" align="left" font="outfit" subTitle="" />

            <form onSubmit={handleSubmit} className="mt-8 max-w-2xl flex flex-col gap-8">

                {/* Image Upload */}
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Room Images</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((slot) => (
                            <label key={slot} className="relative cursor-pointer group">
                                <div className={`aspect-square rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all
                                    ${images[slot] ? 'border-transparent' : 'border-gray-200 hover:border-blue-300 bg-gray-50'}`}>
                                    {images[slot] ? (
                                        <img
                                            src={URL.createObjectURL(images[slot])}
                                            alt={`room-${slot}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-gray-400">
                                            <img src={assets.uploadArea} alt="upload" className="w-8 h-8 opacity-50" />
                                            <span className="text-xs">Photo {slot}</span>
                                        </div>
                                    )}
                                </div>
                                {images[slot] && (
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setImages(prev => ({ ...prev, [slot]: null })) }}
                                        className="absolute top-1.5 right-1.5 bg-white rounded-full w-5 h-5 flex items-center justify-center text-gray-500 hover:text-red-500 shadow text-xs border border-gray-200"
                                    >
                                        ✕
                                    </button>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e, slot)} />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Room Type */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Room Type</label>
                    <select
                        value={form.roomType}
                        onChange={e => setForm(prev => ({ ...prev, roomType: e.target.value }))}
                        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 bg-white transition-all"
                        required
                    >
                        <option value="">Select room type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Suite">Suite</option>
                        <option value="Deluxe">Deluxe</option>
                    </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Price Per Night</label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-400 transition-all">
                        <span className="px-4 py-2.5 text-sm text-gray-400 bg-gray-50 border-r border-gray-200">$</span>
                        <input
                            type="number"
                            min={1}
                            placeholder="0.00"
                            value={form.pricePerNight}
                            onChange={e => setForm(prev => ({ ...prev, pricePerNight: e.target.value }))}
                            className="flex-1 px-4 py-2.5 text-sm text-gray-700 outline-none bg-white"
                            required
                        />
                    </div>
                </div>

                {/* Amenities */}
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                        {amenitiesList.map((amenity) => (
                            <button
                                type="button"
                                key={amenity}
                                onClick={() => toggleAmenity(amenity)}
                                className={`text-sm px-4 py-2 rounded-xl border transition-all ${
                                    form.amenities.includes(amenity)
                                        ? 'bg-blue-50 border-blue-300 text-blue-600'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                }`}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}

                    className="w-fit px-8 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 active:scale-95 transition-all cursor-pointer"
                >
                    {loading ? "Adding..." : "Add Room"}
                </button>

            </form>
        </div>
    )
}

export default AddRoom