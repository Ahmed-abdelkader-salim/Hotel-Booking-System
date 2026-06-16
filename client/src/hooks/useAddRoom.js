import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const useAddRoom = () => {
    const {axios, getToken} = useAppContext();
    const [loading, setLoading] = React.useState(false);


    const addRoom = async({roomType, pricePerNight, amenities, images }) => {
        try{
            setLoading(true);
            const formData = new FormData();
            formData.append("roomType", roomType);
            formData.append("pricePerNight", pricePerNight);
            formData.append("amenities", JSON.stringify(amenities));
            images.forEach((image) => {formData.append("images", image)} );

            const {data} = await axios.post("/api/rooms", formData, {
                headers:{Authorization:`Bearer ${await getToken()}`,
                contentType:"multipart/form-data"
            }});
            if(data?.success){
                toast.success("Room added successfully");
                return data;
            }


        }catch(error){
            toast.error("Error adding room:", error.message);
            console.error("Error adding room:", error.message);
            return false;
        }finally{
            setLoading(false);
        }
    }

  return {addRoom, loading};
}

export default useAddRoom