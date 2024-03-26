import { useContext } from "react";
import "./dashboard.css"
import { AppProvider } from "../../data";
import { MdDashboard } from "react-icons/md";
import { FaBarsProgress } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import Instructor from "./instructorPortal/Instructor";
import { Route,Routes } from "react-router-dom";
import CreateCourse from "./instructorPortal/CreateCourse";

export default function Db(){
    const {user} = useContext(AppProvider);
    if(!user)return;
    console.log(user)
    console.log(111);
    return(
        <div className="DashBoardWrapper">
            <div>
                <Instructor></Instructor>

            </div>
        

        
        
           
            
            
            
        </div>
    );

}