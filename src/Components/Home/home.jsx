import "../Home/home.css"
import { ImBooks } from "react-icons/im";
import achive from "../../images/icons8-achieve-96.png"
import effective from "../../images/target_735716.png"
import award from "../../images/trophy_5355816.png"
import underline from "../../images/underline.svg"
import art from "../../images/palette.png"
import Business from "../../images/growth.png"
import development from "../../images/app-development.png"
import finance from "../../images/asset-management.png"
import health from "../../images/cardiogram.png"
import technology from "../../images/robotic-hand.png"
import dataScience from "../../images/data.png"
import dgtlMarkt from "../../images/smartphone.png"
import line from "../../images/smartphone.png"
import callActionImg from "../../images/call-action-img1.png"
import callshape from "../../images/call-shape1.svg"
import { FaArrowRightLong } from "react-icons/fa6"

import tiltedLine from "../../images/hero-shape-3.svg"
import dottedLines from "../../images/course-cat-1.svg"
import CourseCard from "./CourseCard.jsx";
import image2 from "../../images/design-and-development-process.svg"
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import dashImg from "../../images/50e10f7ecd87a971aa5f6c702158528f.jpg"
import Testimonial from "./TestimonialCard.jsx";
import instructor from "../../images/instructor.jpg"
import { Link } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Loader from "../Loader.jsx";
import Footer from "./Footers.jsx";



const booksStyle = {
    color: '#543ee8',
    display: 'inline',

}




function Home() {
    const [allCourse, setAllCourses] = useState([]);
    const [course, setCourse] = useState([]);



    async function getAllCourse() {
        const coursesJson = await fetch('https://courselms-4.onrender.com/api/v1/getAllCourses');
        const courses = await coursesJson.json();
        setCourse(courses.courses);
        setAllCourses(courses.courses);





    }

    useEffect(() => {
        getAllCourse()
    }, []);

    //console.log(course.courses);


    const [buttonColor, setButtonColor] = useState({
        "See All": true,
        "Business": false,
        "Development": false,
        "Finance": false,
        "Technology": false,
    })



    function colorBtnClickHandler(event) {
        const name = event.target.name
        if (buttonColor[name] === true) return

        let updatedButtonColor = {}

        Object.keys(buttonColor).forEach(key => {
            updatedButtonColor[key] = (key === name);
        });
        setButtonColor(updatedButtonColor);

        if (name === 'See All') {
            setCourse(allCourse);
            return
        }
        const filteredCourses = allCourse.filter(item => item.category.name === name);
        console.log(filteredCourses);


        setCourse(filteredCourses);
    }

    const btnStyle = {
        background: 'linear-gradient(118.54deg,#8674FF 6.57%,#593EFE 85.92%)',
        border: '1px solid #543ee8',
        boxShadow: '0 5px 6px rgba(99,73,255,.4)',
        color: 'white'

    }


    return (
        <div>

            <div className="TopSectionDiv">
                <div className="topSectionLeftDiv">
                    <p id="homedg1">100% Quality Courses</p>
                    <h1 id="homedg2">Start Learning From Our Top<span id="sphome1"><ImBooks style={{marginTop : '-15px',color : '#543ee8',  display: 'inline' }} size={70} /></span> Experts</h1>
                    <p id="homedg3">Choose From Over 4,000 Courses On Topics Like Business, Skills ,UI/UX Design, Web Development And Much More</p>
                   <Link to={'/courses'}><button id="homeAction1">Explore all Courses</button></Link> 


                </div>

                <div className="topSectionRightDiv">
                    <img id="topSectionLeftImg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1708413049/reshot-illustration-education-concept-JHGE2NPBM6_hgi4fy.png" alt="" />

                </div>
            </div>



            <div className="TopSectionDiv2">
                <div className="TopSectionDiv2InnerDiv">
                    <img id="TopSectionDiv2Img1" src={achive} alt="" />

                    <h2 id="TopSectionDiv2D1">Get Achieve New Level</h2>
                    <p id="TopSectionDiv2D2">It is a longe established factey that reader will bee Follow readae con page.</p>
                </div>
                <div className="TopSectionDiv2InnerDiv">
                    <img id="TopSectionDiv2Img2" src={effective} alt="" />
                    <h2 id="TopSectionDiv2D1">Learn With Effectivey</h2>
                    <p id="TopSectionDiv2D2">It is a longe established factey that reader will bee Follow readae con page.</p>
                </div>
                <div className="TopSectionDiv2InnerDiv">
                    <img id="TopSectionDiv2Img3" src={award} alt="" />
                    <h2 id="TopSectionDiv2D1">Award Winning Team</h2>
                    <p id="TopSectionDiv2D2">It is a longe established factey that reader will bee Follow readae con page.</p>
                </div>
            </div>





            <div className="TopSectionDiv3">
                <div className="TopSectionDiv3InnerDiv">
                    <p id="TopSectionDiv3D1">TOP CLASS COURSES</p>
                    <h1 id="TopSectionDiv3D2">Explore 40000+ Free Online Courses</h1>
                    <img id="TopSectionDiv3Img1" src={underline} alt="" />

                    <p id="TopSectionDiv3D3">When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen
                        Book It Has Survived Not Only Five Centuries</p>
                </div>


                <div className="TopSectionDiv3InnerDivA">


                    <div className="TopSectionDiv3InnerDiv11">


                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={art} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Art & Design</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">1 Course</p>
                        </div>

                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={Business} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Business</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">3 Course</p>
                        </div>

                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={development} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Development</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">2 Course</p>
                        </div>

                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={health} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Health</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">2 Course</p>
                        </div>

                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={finance} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Finance</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">1 Course</p>
                        </div>

                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={technology} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Technology</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">2 Course</p>
                        </div>

                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={dgtlMarkt} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Digital Marketing</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">3 Course</p>
                        </div>

                        <div className="TopSectionDiv3InnerDiv1">
                            <div className="TopSectionDiv3InnerDiv1A">
                                <img className="TopSectionDiv3InnerImg2" src={dottedLines} alt="" />
                                <img className="TopSectionDiv3InnerImg3" src={dataScience} alt="" />

                            </div>
                            <div className="TopSectionDiv3InnerDiv1B">
                                <img className="TopSectionDiv3InnerImg4s" src={tiltedLine} alt="" />

                            </div>

                            <h1 id="TopSectionDiv3InnerDiv1D1">Data Science</h1>
                            <p id="TopSectionDiv3InnerDiv1D2">1 Course</p>
                        </div>
                    </div>

                </div>
            </div>


            <div className="MidSectionDiv1">
                <div className="MidSectionDiv1InnerDiv1">
                    <p id="MidSectionDiv1InnerDiv1D1">Featured Course</p>
                    <h1 id="MidSectionDiv1InnerDiv1D2">Find Yours from featured</h1>
                </div>

                <div className="MidSectionDiv1InnerDiv2">
                    {Object.keys(buttonColor).map((key) => {

                        return buttonColor[key] ? <button key={key} name={key} style={btnStyle} onClick={colorBtnClickHandler}>{key}</button> : <button key={key} name={key} onClick={colorBtnClickHandler}>{key}</button>
                    })}
                </div>


            </div>


            <div className="MidSectionDiv2">
                {
                      course.length > 0 && typeof course[0] === 'object' ? course.map((item) => {
                        return <CourseCard data={item}></CourseCard>
                    }) : <Loader></Loader>

                }

            </div>

            <div className="MidSectionDiv3">
                <div className="MidSectionDiv3InnerDiv1">
                    <img id="MidSectionDiv3InnerDiv1Img1" src={image2} />
                </div>
                <div className="MidSectionDiv3InnerDiv2">
                    <p id="MidSectionDiv3InnerDiv2D1">LEARNERS AND STUDENTS</p>
                    <h1 id="MidSectionDiv3InnerDiv2D2">We Teach The Fundamentals Of Art While Encouraging Creativity, Curiosity, And Individuality.</h1>
                    <p id="MidSectionDiv3InnerDiv2D3"> Where we cultivate the seeds of creativity, curiosity, and individuality through the fundamental teachings of art. We believe that every learner is unique, and thus, we foster an environment that celebrates diversity and encourages exploration.</p>
                   <Link to={'/courses'}> <button id="homeAction2">Explore All Courses</button></Link>
                </div>
            </div>

            <div className="MidSectionDiv4" >

                <div className="MidSectionDiv4InnerDiv2">
                    <div className="MidSectionDiv4InnerDiv5">
                        <div className="MidSectionDiv4InnerDiv3">
                            <div className="MidSectionDiv4InnerDiv4">
                                <div className="MidSectionDiv4InnerDiv6">
                                    <FaPlay style={booksStyle} size={50} />
                                    <h1 id="MidSectionDiv4InnerDiv2D2">Smart LMS</h1>
                                </div>
                                <p id="MidSectionDiv4InnerDiv2D1">Unlock the power of Smart LMS to revolutionize your learning journey. Streamline education and training with cutting-edge technology today!</p>

                            </div>

                            <div className="MidSectionDiv4InnerDiv4">
                                <div className="MidSectionDiv4InnerDiv6">
                                    <MdSpaceDashboard style={booksStyle} size={50} />
                                    <h1 id="MidSectionDiv4InnerDiv2D2">Powerful Dashboard</h1>
                                </div>
                                <p id="MidSectionDiv4InnerDiv2D1">Harness the full potential of our Smart LMS with its powerful dashboard, providing comprehensive insights and control at your fingertips.</p>

                            </div>

                            <div className="MidSectionDiv4InnerDiv4">
                                <div className="MidSectionDiv4InnerDiv6">
                                    <LuSettings2 style={booksStyle} size={50} />
                                    <h1 id="MidSectionDiv4InnerDiv2D2">Easy to Customize</h1>
                                </div>
                                <p id="MidSectionDiv4InnerDiv2D1">Experience seamless customization with our Smart LMS platform, tailored to suit your unique learning needs effortlessly.</p>

                            </div>

                        </div>
                        <img id="MidSectionDiv4InnerDiv2Img1" src={dashImg} alt="" />
                    </div>
                </div>
            </div>


            <div className="FooterSection1">
                <div className="FooterSectionInnerDiv1">
                    <div className="FooterSectionInnerDiv2">
                        <h1 id="FooterSectionInnerDiv2D1">Our Customers Feedback!</h1>
                        <p id="FooterSectionInnerDiv2D2">Discover why our customers love our products and services. Read their testimonials to learn about their experiences and successes with our offerings.</p>
                    </div>
                    <div className="FooterSectionInnerDiv3">
                        <Testimonial />

                    </div>
                </div>
            </div>


            <div className="FooterDiv3">
                <img id="FooterDiv3Img2" src={callshape} />
                <img id="FooterDiv3Img1" src={callActionImg} />
                <div className="FooterDiv3InnerDiv2">

                    <h1 id="FooterDiv3InnerDiv1">Affordable Online Courses & Learning Opportunities For You</h1>
                    <Link>
                        <button id="FooterDiv3Action3">
                            Start Learning Today
                            <FaArrowRightLong style={{ display: 'inline', marginLeft: '7px', marginTop: '-2px' }}></FaArrowRightLong>
                        </button>
                    </Link>

                </div>

            </div>




            <div className="FooterDiv2">
                <div className="FooterDiv2InnerDiv1">
                    <p id="FooterDiv2InnerDiv1D1">BECOME AN INSTRUCTOR</p>
                    <h1 id="FooterDiv2InnerDiv1D2">Lets Join Us & Spread Your Knowledge</h1>
                    <p id="FooterDiv2InnerDiv1D3">Join our esteemed team of educators and share your knowledge with a global audience. Learn how you can empower others through teaching and become a part of our vibrant community of instructors.</p>
                    <Link to={'/'}>
                        <button id="homeAction2">Become An Instructor</button>
                    </Link>
                </div>
                <div className="FooterDiv2InnerDiv2">
                    <img id="FooterDiv2InnerDiv2Img1" src={instructor} alt="" />
                </div>
            </div>



        </div>


    );

}

export default Home
