import "./instructor.css"
import { IoMdAddCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Instructor(data) {
    const style = {
        color  : '#a435f0'
    }
 

    const [num,setNum] = useState(data.num);
    return (

        <div className="InstructorWrapper">

            <div className="InstructorInnerDiv1">
                <Link to={'/dashboard/MyAccount'}>
               
                <div  className={`InstructorInnerDiv2${num === 1? 'selected' : ''}`} onClick={()=>setNum(1)} >
                    <MdDashboard style={style}></MdDashboard>
                    <p>My Account</p>

                </div>

                </Link>

                <Link to={'/myCourses'}>

                <div  className={`InstructorInnerDiv2${num === 2? 'selected' : ''}`} onClick={()=>setNum(2)}>
                    <FaBarsProgress style={style} className="pg"></FaBarsProgress>
                    <p>My Learnings</p>


                </div>
                </Link>

                <Link to={'/dashboard/addNewCourse'}>

                <div className={`InstructorInnerDiv2${num === 3? 'selected' : ''}`} onClick={()=>setNum(3)}>
                    <IoMdAddCircle style={style}></IoMdAddCircle>
                    <p>Add Courses</p>


                </div>
                </Link>
                <Link to={'/dashboard/editCourse'}>
                <div onClick={()=>setNum(4)} className={`InstructorInnerDiv2${num === 4? 'selected' : ''}`}>
                    <FaEdit style={style}></FaEdit>
                    <p>Edit Course</p>

                </div>
                </Link>
            </div>
        </div>



    );

}