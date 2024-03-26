import "./profileIcon.css"
import { useContext, useState } from "react";
import { useRef,useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { AppProvider } from "../../../data";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
  
export default function ProfileIcon() {
    const {user} = useContext(AppProvider);
    
    const [name, setName] = useState(user.name);

    const fullName = name.split(' ');
    const profileName = fullName[0][0].charAt(0).toUpperCase() + fullName[1][0].charAt(0).toUpperCase();
   
    const [profileMenu, setProfileMenu] = useState(false);
 

    const toggleBtnOptions = {
        position: 'absolute',
         top:   '50',
          right:  window.innerWidth < 600 ?  '35px' :  '110' ,
           cursor  :'pointer'

    }

      function logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success('Logged Out');
        window.location.reload();

    }




    {user && user.account_type !== 'student' ? (
    <>
        <Link to={'/dashboard/addNewCourse'}>
            <div className={`InstructorInnerDiv2${num === 3 ? 'selected' : ''}`} onClick={() => setNum(3)}>
                <IoMdAddCircle style={style}></IoMdAddCircle>
                <p>Add Courses</p>
            </div>
        </Link>
        <Link to={'/dashboard/editCourse'}>
            <div onClick={() => setNum(4)} className={`InstructorInnerDiv2${num === 4 ? 'selected' : ''}`}>
                <FaEdit style={style}></FaEdit>
                <p>Edit Course</p>
            </div>
        </Link>
    </>
) : (
    <FaCaretDown style={toggleBtnOptions} size={15} onClick={() => setProfileMenu(!profileMenu)}></FaCaretDown>
)}



}
