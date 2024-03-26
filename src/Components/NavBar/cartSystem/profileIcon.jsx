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
    const profileName = fullName[0][0] + fullName[1][0];
    console.log(profileName);
    const [profileMenu, setProfileMenu] = useState(false);
    console.log('width is ', window.innerWidth);

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




    return (
        <div>
            <div className="profileInnerDiv1">
                <div className="profileIconClass">{profileName}</div>
                {
                    profileMenu ?
                        <div>

                            <FaCaretUp style={toggleBtnOptions} size={15} onClick={()=>{setProfileMenu(!profileMenu)}}></FaCaretUp>
                            <div className="profileIconHoverDiv">
                                <Link to={'dashboard/MyAccount'}><p>Dashboard</p></Link>
                                <p>My Courses</p>
                                <p>Edit Profile</p>
                                <p onClick={logOut}>Log Out</p>
                            </div>

                        </div>

                        :

                        

                        <FaCaretDown style={toggleBtnOptions} size={15} onClick={()=>{setProfileMenu(!profileMenu)}}></FaCaretDown>

    
                        

                    }





            </div>
        </div>
    );


}
