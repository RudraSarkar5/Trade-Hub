import { Routes,Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Chat from "../pages/ChatPage/Chat";
import Login from "../pages/LoginPage/Login";
import Signup from "../pages/SignUpPage/SignUp";
import ProductInfo from "../pages/ProductInfoPage/ProductInfo";
import Profile from "../pages/ProfiePage/Profile";
import ContactUs from "../pages/ContactUsPage/ContactUs";
import Error from "../pages/ErrorPage/Error";
import EditProduct from "../pages/EditProductPage/EditProduct";
import EditProfile from "../pages/EditProfilePage/EditProfile";

const CustomRoutes=()=>{
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/chat/:id' element={<Chat/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/product-info' element={<ProductInfo/>}/>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/profile-update/:productId' element={<EditProfile/>} />
            <Route path='/product-update' element={<EditProduct/>} />
            <Route path='/contact-us' element={<ContactUs/>} />
            <Route path='/*' element={<Error/>} />

        </Routes>
    )
}
export default CustomRoutes;