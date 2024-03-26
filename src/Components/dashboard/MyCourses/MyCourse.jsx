import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Instructor from "../instructorPortal/Instructor";
import "./MyCourse.css"
import { AppProvider } from "../../../data";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

export default function MyCourse() {
    const navigate = useNavigate();
    const {user,getDetails} = useContext(AppProvider);
    const [courseDetails,setCourseDetails] = useState(user.courses);
    useEffect(()=>{
        setCourseDetails(user.courses);
    },[user])
   // console.log(user)

 

    function clickingCardHandler(data,course_id){
        const arr = data.courseContent;
        

        for(let i = 0; i<arr.length; i++) {
            if(arr[i].subSection.length > 0) {
                navigate(`/${course_id}/lecture/${arr[i].subSection[0]._id}`);
                break;
            }
        }

    }
  
    return (
    <div className="MyCoursesWrapperClass">
        <Instructor num={2}></Instructor>
        <div className="MyCoursesInnerDiv1">
            <p id="MyCoursesDg1">My Courses</p>
            <div className="MyCoursesInnerDiv2">
                {
                  courseDetails.length > 0 && typeOf courseDetails[0] === 'object'  ?   courseDetails.map((course)=>{
                        return (
                            
                            <div onClick={()=>clickingCardHandler(course,course._id)} className="myCourseCards">
                                <img id="myCourseThumnail" src={course.thumbnail} alt="" />
                                <p id="myCourse">{course.courseName}</p>
                            </div>
                            
                        );
                    }) :  courseDetails.length > 0 ? <Loader></Loader> : <div>No Courses Available</div>
                    
                }


            </div>
        
        </div>

      
    </div>
    );



}
