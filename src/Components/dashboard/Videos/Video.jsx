import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Videos/videos.css"
import { Link, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AppProvider } from "../../../data";
import Loader from "../../Loader";

export default function Videos(){
    const navigate = useNavigate();
    //console.log('hiii')

    const {courseId,videoId} = useParams();
    const [vidData,setVidData] = useState([]);
    const [courseData,setCourseData] = useState([]);
    const [dropDownMenu,setDropDownMenu] =useState(false);
    const {loader,setLoader} = useContext(AppProvider);

    console.log(videoId,courseId);
    console.log(courseData);

    async function getVideo() {
        setLoader(true)

        const data = await fetch('https://courselms-4.onrender.com/api/v1/getVideoData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({subSectionId : videoId})
        });

        const response = await data.json();
        setLoader(false);
        setVidData(response.data);

    }

    async function getCourseData (){
        setLoader(true);
        const data = await fetch(`https://courselms-4.onrender.com/api/v1/getCourse/${courseId}`)
        const response = await data.json();
       // console.log(response)
       setLoader(false);
        setCourseData(response.courseData.courseContent);
        //console.log(response)

    }

    function onclickVideoHandler(id){
        navigate(`/${courseId}/lecture/${id}`);
        window.location.reload();

    }
    console.log(vidData.video_url)

    useEffect(()=>{
        getVideo();
        getCourseData();
        
    },[])
    if(loader) {
        return (
            <Loader></Loader>
        )

    }
   
    return(
        <div className="VideoWrapper">
            <div className="videoInnerDiv1">
                <video id="video" controls src={vidData.video_url}></video>
            </div>
            <div>

            <div className="course-formInnerDiv1">
                {courseData &&
                    <div className="coursesSectionListDivC">
                        {
                        courseData.map((item, index) => {
                            return (

                                <div>
                                    <div className="coursesSectionListDivItem1A">
                                        <p>{item.sectionName}</p>
                                        <div className="coursesSectionListDivItem1">
                                            {dropDownMenu === index ?
                                                <FaChevronUp style={{ cursor: 'pointer' }} onClick={() => setDropDownMenu(false)} /> :
                                                <FaChevronDown style={{ cursor: 'pointer' }} onClick={() => setDropDownMenu(index)} />}

                                        </div>



                                    </div>


                                    {
                                        dropDownMenu === index &&
                                        <div className="coursesSubSectionDiv1">
                                            {item.subSection.map((sub) => {
                                                return <div onClick={()=>onclickVideoHandler(sub._id)} className="coursesSubSectionDiv2">
                                    
                                                    <h1 id="videoLink"><p>{sub.title}</p></h1>
                                                    
                                                    
                                                
                                                </div>
                                            })}




                                        </div>

                                    }
                                </div>




                            )


                        })

                        }





                    </div>

                }

               
                </div>

            </div>
        </div>
    );
}
