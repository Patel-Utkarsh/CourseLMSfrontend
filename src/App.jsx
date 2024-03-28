import "./App.css";
import SignUp from "../src/Components/SignUp"
import Home from "./Components/Home/home";
import Nav from "./Components/NavBar/nav";
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import CourseCard from "./Components/Home/CourseCard";
import SingleCourse from "./Components/Courses/SingleCourse";
import Footer from "./Components/Home/Footers";
import Category from "./Components/Category/Category";
import Login from "./Components/NavBar/Auth/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShoppingCart from "./Components/NavBar/cartSystem/ShoppingCart";
import Dashboard from "./Components/dashboard/Dashboard";
import Db from "./Components/dashboard/Dashboard";
import CreateCourse from "./Components/dashboard/instructorPortal/CreateCourse";
import EditCourse from "./Components/dashboard/instructorPortal/EditCourse";
import MyAccount from "./Components/dashboard/instructorPortal/MyAccount";
import Videos from "./Components/dashboard/Videos/Video.jsx";
import MyCourse from "./Components/dashboard/MyCourses/MyCourse.jsx";
import ForgetPass from "./Components/ForgetPassword/ForgetPass.jsx";
import Reset from "./Components/ForgetPassword/ResetPassword.jsx";
import SignUpCard from "./Components/SignUP/SignUpCard.jsx";
import OrderSuccess from "./Components/dashboard/OrderConfirmation/OrderConfirm.jsx";


function App() {
  return (
    <div>
      <Nav></Nav>
    
    
    <Routes>
      <Route index path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<SignUpCard></SignUpCard>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/course/:courseId" element={<SingleCourse/>}></Route>
      <Route path="/category/:categoryName?" element={<Category/>}></Route>
      <Route path="/courses" element={<Category/>}></Route>
      <Route path="/cart" element={<ShoppingCart></ShoppingCart>}></Route>
    
      <Route path="/dashboard/addNewCourse" element={<CreateCourse></CreateCourse>}></Route>
      <Route path="/dashboard/editCourse" element={<EditCourse></EditCourse>}></Route>
      <Route path="/dashboard/MyAccount" element={<MyAccount></MyAccount>}></Route>
      <Route path="/:courseId/lecture/:videoId" element={<Videos></Videos>}></Route>
      <Route path="/myCourses" element={<MyCourse></MyCourse>}></Route>
      <Route path="forget-password" element={<ForgetPass></ForgetPass>}></Route>
      <Route path="/update-password/:token" element={<Reset></Reset>}></Route>
      <Route path="/order/success" element={<OrderSuccess></OrderSuccess>}></Route>
      
    </Routes>

    <ToastContainer></ToastContainer>
    

    <Footer></Footer>
    
  

    </div>
    
    
    
   
    
  );
}

export default App;
