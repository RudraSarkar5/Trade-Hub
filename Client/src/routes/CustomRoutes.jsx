import { Routes, Route } from "react-router-dom";
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
import ChatBox from "../components/ChatBox/ChatBox";
import ForgetPasswordPage from "../pages/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage/ResetPasswordPage";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat-box/:id" element={<ChatBox />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product-info/:productId" element={<ProductInfo />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile-update" element={<EditProfile />} />
      <Route path="/product-update" element={<EditProduct />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/forget-password" element={<ForgetPasswordPage/>} />
      <Route path="/reset-password/:resetToken" element={<ResetPasswordPage/>} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};
export default CustomRoutes;
