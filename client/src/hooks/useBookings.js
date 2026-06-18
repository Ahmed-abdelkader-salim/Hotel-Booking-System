import React from 'react'
import { useAppContext } from '../context/AppContext';

const useBookings = () => {
    const {axios, getToken, currency} = useAppContext();
    const [bookings, setBookings] = React.useState([]);
    const [loading, setLoading] = React.useState(true)

    const fetchBookings = async() => {
        try {
            setLoading(true);

            const {data} = await axios.get('/api/bookings/user', {
                headers:{Authorization:`Bearer ${await getToken()}`}
            })
            if(data?.success){
                setBookings(data.bookings)
            }else{
                console.error(data.message)
            }
        } catch (error) {
            console.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    React.useEffect(() => {
        fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {bookings, loading, currency, fetchBookings}
}


export default useBookings
