import { Routes,Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Chat from "../pages/ChatPage/Chat";
import Login from "../pages/LoginPage/Login";
import Signup from "../pages/SignUpPage/SignUp";
import ProductInfo from "../pages/ProductInfoPage/ProductInfo";
import Profile from "../pages/ProfiePage/Profile";
import ContactUs from "../pages/ContactUsPage/ContactUs";
const CustomRoutes=()=>{
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/chat/:id' element={<Chat/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/productInfo/:id' element={<ProductInfo/>}/>
            <Route path='/profile/:id' element={<Profile/>} />
            <Route path='/contactUs' element={<ContactUs/>} />

        </Routes>
    )
}
export default CustomRoutes;