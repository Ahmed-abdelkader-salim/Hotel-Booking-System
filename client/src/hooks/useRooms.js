import React from 'react'
import { useAppContext } from '../context/AppContext';

const useRooms = () => {
    const {axios} = useAppContext();
    const [rooms, setRooms] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const fetchRooms = async() => {
        try {
            setLoading(true);
            const {data} = await axios.get("/api/rooms");
            if(data.success){
                setRooms(data.rooms);
            }else{
                console.error(data.message)
            }
        } catch (error) {
            console.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {rooms, loading}
}

export default useRooms
