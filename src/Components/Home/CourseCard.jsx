import "../Home/courseCard.css"
import React, { useContext } from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineContactPage } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppProvider } from "../../data";



export default function CourseCard(course) {
 
   const {setStars} = useContext(AppProvider);

  

    return (
        <Link to={`/course/${course.data._id}`}>
        <div className="course-card">
            <img id='course-cardImg' src={course.data.thumbnail} alt="" />
            <div className='course-cardInnerDiv1'>
                <div><BsFillPeopleFill style={{display : 'inline'}}/>
                {` ${Math.floor(Math.random()* (1000-10) + 10)} students`}</div>
                <div><MdOutlineContactPage style={{display : 'inline'}}/> {`${course.data.courseContent.length} lessons`}</div>
            </div>
            <h1 id='course-card-title'>{`${course.data.courseName.substring(0,27)}...`}</h1>
            <div className='course-cardInnerDiv1-2'>
                <div>{setStars()}</div>
                <p>{`₹${course.data.price}`}</p>
            </div>

            <div className="course-cardInnerDiv1-3">{course.data.category.name}</div>
        </div>
        </Link>
    );
}
