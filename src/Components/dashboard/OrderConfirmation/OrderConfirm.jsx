import "./order.css"
import img123 from "../../../images/icons8-correct.svg"
import { useNavigate } from "react-router-dom"
export default function OrderSuccess(){
    const navigate = useNavigate();
    return(
        <div className="OrderWrapper">
            <img id="orderImg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1711626156/5738137_ccafe4.jpg" alt="" />
            <div className="orderInnerDiv1">
                <img id="correctImg" src={img123} alt="" />
                <p id="orderConfirmDg1">Order Confirmed Successfully</p>
                <button onClick={()=>{navigate('/myCourses')}} id="myCoursesBtn">My Courses</button>
            </div>
        </div>
    )


}