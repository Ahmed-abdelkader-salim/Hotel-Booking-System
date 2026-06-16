import axios from "axios";
import { createContext, useContext } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth, useUser} from "@clerk/clerk-react";
import { useState } from "react";
import {toast} from "react-hot-toast"
import { useEffect } from "react";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();


export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const {user} = useUser();
    const {getToken} = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);

    const fetchUser = async() => {
        try {
            const {data} = await axios.get("/api/user", {headers:{Authorization:`Bearer ${await getToken()}`}})
            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities || []);
            }else{
                // Retry fetching user data 
                setTimeout(() => {
                    fetchUser();
                }, 5000)
            }

        } catch (error) {
            toast.error("Error fetching user data:", error.message);
        }
    }

    useEffect(() => { 
        if(user) {
            fetchUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


    const value = {
        user,
        currency,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        getToken,
        navigate,
        axios,
        searchedCities,
        setSearchedCities,

    }




    return(

        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )


}



// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);





