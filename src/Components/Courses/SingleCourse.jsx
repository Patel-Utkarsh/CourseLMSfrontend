import "../Courses/singleCourse.css"
import startup from "../../images/startup.svg"
import { useContext, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom"
import { AppProvider } from "../../data";
import { GrLanguage } from "react-icons/gr";
import { MdAssignment, MdContactPage  } from "react-icons/md";
import { FaFileDownload,FaMobileAlt,FaTrophy } from "react-icons/fa";
import SectionCard from "./sectionCard";
import Loader from "../Loader";
import { toast } from "react-toastify";

const iconDefSettings = {
    display : 'inline',
    marginRight : '5px',
    marginTop : '3px',
    color :'#a735f0'
}

export default function SingleCourse() {
    let { courseId } = useParams();
    const navigate  = useNavigate();

    const [course, setCourseData] = useState(null);
    const [whatWillYouLearn,setWhatWillYouLearn] = useState("");
    const {setStars,user,cart,getDetails,loader,setLoader} = useContext(AppProvider);

    function goToCartHandler() {
        navigate('/cart');

    }

  
  

    async function getCourseDetails() {
        setLoader(true);
        const data = await fetch(`https://courselms-4.onrender.com/api/v1/getCourse/${courseId}`)

        const course = await data.json();
        setLoader(false);
        setCourseData(course);
        setWhatWillYouLearn(course.courseData.whatWillyouLearn);
        

    }

    async function addToCart(){
        if(!user){
             navigate('/login')
             return
        }
        setLoader(true);
     
        const data = await fetch('https://courselms-4.onrender.com/api/v1/addToCart',{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                id : user._id,
                course_id : course.courseData._id
             
            })

        });

        const response = await data.json();
        //console.log(response);
        setLoader(false);
        toast.success('Course Added to cart')
        getDetails();

    }

    function isAddedToCart(arr,id) {
        return arr.some((obj => obj._id === id));
        
    }



    useEffect(() => {
        getCourseDetails()

    }, [])
    
    if(loader) return <Loader></Loader>
    return (
        course === null ? ' '  :

        
        <div className="SingleCourseWrapperClass">
            <div className="SingleCourseDiv1">


                <div className="SingleCourseDiv1InnerDiv1">
                    <h1 id="SingleCourseDiv1InnerDiv1D1">{course.courseData.courseName}</h1>
                    <p id="SingleCourseDiv1InnerDiv1D2">{course.courseData.courseDescription}</p>
                    <span className="SingleCourseDiv1InnerDiv3">
                        <div className="SingleCourseDiv1InnerDiv1D4">Bestseller</div>
                        <div>{setStars()}</div>
                        <div className="SingleCourseDiv1InnerDiv6">
                            <GrLanguage style={{position : 'inline',marginRight : '5px'}}/>
                            <p>English</p>
                        </div>
                    </span>
                   
                </div>

                <div className="SingleCourseDiv1InnerDiv2">
                    <img id="SingleCourseDiv1InnerDiv2Img1" src={course.courseData.thumbnail} alt="" />
                    <div className="SingleCourseDiv1InnerDiv7"> 
                        <p id="SingleCourseDiv1InnerDiv7D1">{`₹${course.courseData.price}`}</p>
                        <div className="SingleCourseDiv1InnerDiv8">
                            {user && isAddedToCart(cart,course.courseData._id) ?
                                <button id="SingleCourseDiv1InnerDiv7Action2" onClick={goToCartHandler}>Go to Cart</button> : 
                                <div className="SingleCourseDiv1InnerDiv8">
                                     <button id="SingleCourseDiv1InnerDiv7Action1" >Buy Now</button>
                                    <button id="SingleCourseDiv1InnerDiv7Action2" onClick={addToCart}>Add to Cart</button>

                                </div>
                               

                            }

                            

                        </div>
                        
                    </div>
                </div>
            </div>


            <div className="SingleCourseMidSection1">
                <h1 id="SingleCourseMidSection1D1">What You will Learn</h1>
                <p id="SingleCourseMidSection1D2">{whatWillYouLearn}</p>
            </div>

            <div className="SingleCourseMidSection2">
                <p id="SingleCourseMidSection1D1">This Course Involves</p>
              
                <div className="SingleCourseMidSection2InnerDiv2">
                    <div className="SingleCourseMidSection2InnerDiv1">
                        <MdAssignment style={iconDefSettings}></MdAssignment>
                        <p>Assignments</p>
                    </div>
                    <div className="SingleCourseMidSection2InnerDiv1">
                        <MdContactPage style={iconDefSettings}></MdContactPage>
                        <p>Articles</p>

                    </div>


                    <div className="SingleCourseMidSection2InnerDiv1">
                        <FaFileDownload style={iconDefSettings}></FaFileDownload>
                        <p>Downloadable Resources</p>
                    </div>

                    <div className="SingleCourseMidSection2InnerDiv1">
                        <FaMobileAlt style={iconDefSettings}></FaMobileAlt>
                        <p>Access on TV & Mobile</p>
                    </div>


                    <div className="SingleCourseMidSection2InnerDiv1">
                        <FaTrophy style={iconDefSettings}></FaTrophy>
                        <p>Certificate of completion</p>
                    </div>

                    
                </div>

               
            </div>

            <div className="SingleCourseMidSection3">
                <h1 id="SingleCourseMidSection3D1">Course Content</h1>
                <div>{course.courseData.courseContent.map((item)=>{
                    return <SectionCard data={item}/>
                })}</div>
            </div>

        </div>
    )
}
