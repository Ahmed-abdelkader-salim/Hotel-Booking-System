import React from 'react'
import { useAppContext } from '../context/AppContext';

const useDashboard = () => {

    const {axios, getToken, currency} = useAppContext();
    const [dashboardData, setDashboardData] = React.useState({
        totalBookings:0,
        totalRevenue:0,
        bookings:[],
    });

    const [loading, setLoading] = React.useState(true);


    const fetchDashboardData = async() => {
        try{
            setLoading(true);
            const {data} = await axios.get("/api/bookings/hotel", {
                headers:{Authorization:`Bearer ${await getToken()}`}
            });
            setDashboardData({
                totalBookings:data.dashboardData.totalBookings,
                totalRevenue:data.dashboardData.totalRevenue,
                bookings:data.dashboardData.bookings,
            })
        }catch(error){
                console.error(error.message)

        }finally{
            setLoading(false);
        }

    }
    React.useEffect(() => {
        fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return {dashboardData, loading, refetch:fetchDashboardData, currency};
}

export default useDashboard;
