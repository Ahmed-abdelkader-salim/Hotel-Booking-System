import React from 'react'
import Navbar from '../../components/Owner/Navbar'
import Sidebar from '../../components/Owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
    const {isOwner, navigate} = useAppContext();

    React.useEffect(() => {
        if(!isOwner){
            navigate('/');
        }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOwner]);
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <div className='sticky top-0 h-screen'>
                    <Sidebar />
                </div>
                <main className='flex-1 overflow-y-auto py-8'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout