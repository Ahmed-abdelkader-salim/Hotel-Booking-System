import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/Owner/Layout";
import AddRoom from "./pages/Owner/AddRoom";
import Dashboard from "./pages/Owner/Dashboard";
import ListRoom from "./pages/Owner/ListRoom";
import {Toaster} from "react-hot-toast"
import { useAppContext } from "./context/AppContext";
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg} = useAppContext();
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {!isOwnerPath && <Navbar />} {/*Render Navbar only if on owner path*/}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="addRoom" element={<AddRoom />} />
            <Route path="listRoom" element={<ListRoom />} />

          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
