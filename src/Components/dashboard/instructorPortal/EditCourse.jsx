import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Instructor from "./Instructor";
import { IoCloudUpload } from "react-icons/io5";


import { MdEdit, MdDelete } from "react-icons/md";
import "./editCourse.css"
import { AppProvider } from "../../../data";
import { ImCross } from "react-icons/im";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Loader from "../../Loader";


export default function EditCourse() {
    const { user, getDetails,loader,setLoader } = useContext(AppProvider);
    const [courseInd, setCourseInd] = useState(0);
    const [course, setCourse] = useState(user.coursesAsInstructor[courseInd]);
    const [categoryData, setCategoryData] = useState([]);
    const [addSection, setAddSection] = useState(false);
    const [edit, setEdit] = useState(false);
    const [addLecture, setAddLecture] = useState(false);
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [sectionId, setSectionId] = useState(null);
    const [editSubsection, setEditSubsection] = useState(false);
    const [subSectionId, editSubSectionId] = useState(null);
    const [deleteSubsectionId, setdeleteSubSectionId] = useState(null);
    const [deleteSectionId, setdeleteSectionId] = useState(null);
    console.log(courseInd);




    const [thumbnail, setThumbnail] = useState(null);



    const [courseData, setCourseData] = useState({
        courseName: "",
        courseDescription: "",
        category: "",
        price: "",
        whatWillyouLearn: "",
        published: false,
        id: user._id
    });

    const obj1 = {
        sectionName: "",
        videos: []

    }

    const [sectionData, setSectionData] = useState(obj1)


    // console.log(sectionData);
    //console.log(course);

    const obj2 = {
        title: "",
        video: ""

    }

    const [singleSectionData, setSingleSectionData] = useState(obj2);

    useEffect(() => {
        getDetails();
        getCategories();
    }, [])

    useEffect(() => {
        setCourse(user.coursesAsInstructor[courseInd])

    }, [courseInd])

    useEffect(()=>{
        setCourse(user.coursesAsInstructor[courseInd])



    },[user])






    console.log(singleSectionData);

    async function getCategories() {
        setLoader(true);
        const data = await fetch('https://courselms-4.onrender.com/api/v1/getAllCategories');
        const categories = await data.json();
        setCategoryData(categories.data);
        setLoader(false);


    }






    const handleChange = (e) => {

        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(courseData).some(item => item === "");
        if (isEmpty) {
            toast.warn('Please Fill all the Fields');
            return

        }

        const priceNumeric = parseFloat(courseData.price);
        if (isNaN(priceNumeric)) {
            toast.warn('Price must be a valid number');
            return;
        }



    };

    function saveSingleSectionHandler(e) {
        e.preventDefault();
        if (singleSectionData.title === "" || singleSectionData.video === "") {
            toast.warn('Please fill all the fields');
            return

        }

        setAddLecture(false);
        setSectionData(prevState => ({
            ...prevState,
            videos: [...prevState.videos, singleSectionData]
        }));
    }

    async function editSubsectionHandler(e) {
        e.preventDefault();
        if (singleSectionData.title === "" && singleSectionData.video === "") {
            toast.warn('Please fill atleast one field');
            return

        }

        let obj = new FormData();
        obj.append('title', singleSectionData.title != "" ? singleSectionData.title : null);
        obj.append('subSectionId', subSectionId);
        obj.append('video', singleSectionData.video != "" ? singleSectionData.video : null);



        setLoader(true);
        const data = await fetch('https://courselms-4.onrender.com/api/v1/updateSubSection', {
            method: 'PUT',

            body: obj
        });

        const response = await data.json();
       // console.log(response);
       setLoader(false);
        getDetails();
        if (response.success) {
            toast.success('subsection edited successfully');
        }
        setAddLecture(false);
        setEditSubsection(false);

    }



    function handleFileChange(e) {
        const file = e.target.files[0];
        setThumbnail(file);

    }

    function addSectionHandler(e) {
        e.preventDefault();

        const { name, value, files } = e.target;

        const newValue = name === "video" && files ? files[0] : value;

        setSingleSectionData(prevState => ({
            ...prevState,
            [name]: newValue
        }));


    }

    async function updateSection(obj) {
        setLoader(true)
        const data = await fetch('https://courselms-4.onrender.com/api/v1/updateSection', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        const response = await data.json();
        setLoader(false);

        return await response

    }

    async function createSection(obj) {
        setLoader(true);
        const data = await fetch('https://courselms-4.onrender.com/api/v1/createSection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        const response = await data.json();
        setLoader(false);

        return await response

    }

    async function createSubSection(obj) {
       // console.log(obj);
       setLoader(true);
        const data = await fetch('https://courselms-4.onrender.com/api/v1/createSubSection', {
            method: 'POST',

            body: obj
        });

        const response = await data.json();
        setLoader(false);

        return await response

    }

    async function editSuBsection(obj) {
        setLoader(true)
        const data = await fetch('https://courselms-4.onrender.com/api/v1/updateSubSection', {
            method: 'PUT',

            body: obj
        });

        const response = await data.json();
        setLoader(false);

        return await response

    }

    async function deleteSectionHandler(e) {
        e.preventDefault();
        setLoader(true);

        const data = await fetch('https://courselms-4.onrender.com/api/v1/deleteSection', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ sectionId: deleteSectionId })
        });

        const response = await data.json();
        setLoader(false);
        console.log(response);
        if (response.success) toast.success('section deleted successfully');
        getDetails();
        setdeleteSectionId(null);


    }

    async function deleteSubSectionHandler(e) {
        e.preventDefault();
       // console.log(deleteSubsectionId);
       setLoader(true)

        const data = await fetch('https://courselms-4.onrender.com/api/v1/deleteSubSection', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ subSectionId: deleteSubsectionId })
        });

        const response = await data.json();
        setLoader(false)
       // console.log(response);
        if (response.success) toast.success('Subsection deleted successfully');
        getDetails();
        setdeleteSubSectionId(null);




    }




    function removeSubSectionHandler1(ind) {
        const newArr = sectionData.videos.filter((item, index) => index !== ind);
        console.log(newArr);
        setSectionData(prevState => ({
            ...prevState,
            videos: newArr
        }));

    }

    async function updateChangesHandler(e) {
        e.preventDefault();
        const data = {
            editSection: sectionData.sectionName,
            sectionId: sectionId
        }

        if (data.editSection != "") {
            const request = await updateSection(data);
            if (request.success) {
                toast.success('section updated')
            }
            getDetails();


        }



        sectionData.videos.map(async (item) => {

            let formData = new FormData();
            formData.append('title', item.title);
            formData.append('sectionId', sectionId);
            formData.append('file', item.video);
            const result = await createSubSection(formData);
            if (result.success) {
                toast.success('subsection Created successfully');
            }
            getDetails()
            console.log(result);

        })




        setAddSection(false);



    }

    async function saveChangesHandler(e) {
        e.preventDefault();

        const sectiondata = {
            sectionName: sectionData.sectionName,
            courseId: course._id


        }


        const res = await createSection(sectiondata);
        console.log(res);
        if (res.success) {
            toast.success('Section Created')
        }


        //console.log(sectionData)

        sectionData.videos.map(async (item) => {

            let formData = new FormData();
            formData.append('title', item.title);
            formData.append('sectionId', res.id);
            formData.append('file', item.video);
            const result = await createSubSection(formData);

        })
        setAddSection(false);
        getDetails();








    }

    if(loader) {
        return <Loader></Loader>
    }

    if (edit) return (
        <div className="ModalWrapper">

            <form className="course-form" >
                <h2 id="editCourseHeading">Edit Course</h2>
                <div className="course-formInnerDiv1">
                {course.courseContent.length > 0 &&
                    <div className="coursesSectionListDiv">
                        {
                        course.courseContent.map((item, index) => {
                            return (

                                <div>
                                    <div className="coursesSectionListDivItem">
                                        <p>{item.sectionName}</p>
                                        <div className="coursesSectionListDivItem1">
                                            <MdDelete style={{ cursor: 'pointer' }} onClick={() => setdeleteSectionId(item._id)} />
                                            <MdEdit style={{ cursor: 'pointer' }} onClick={() => { setSectionId(item._id); setAddSection(true); setEditMode(true) }} />
                                            {dropDownMenu === index ?
                                                <FaChevronUp style={{ cursor: 'pointer' }} onClick={() => setDropDownMenu(false)} /> :
                                                <FaChevronDown style={{ cursor: 'pointer' }} onClick={() => setDropDownMenu(index)} />}

                                        </div>



                                    </div>


                                    {
                                        dropDownMenu === index &&
                                        <div className="coursesSubSectionDiv1">
                                            {item.subSection.map((sub) => {
                                                return <div className="coursesSubSectionDiv2">
                                                    <p>{sub.title}</p>
                                                    <div className="coursesSubSectionDiv3">

                                                        <MdDelete style={{ cursor: 'pointer' }} onClick={() => setdeleteSubSectionId(sub._id)} />
                                                        <MdEdit style={{ cursor: 'pointer' }} onClick={(e) => { setAddLecture(true); setEditSubsection(true); editSubSectionId(sub._id) }} />
                                                    </div>
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

               

                <div className="form-group">
                    <button id="addSection" onClick={(e) => { e.preventDefault(); setSectionData(obj1); setAddSection(true); setEditMode(false) }} >Add Section</button>
                </div>



                {addSection && <div className="addSectionDiv">
                    <div className="ModalsectionDiv">
                        <button onClick={(e) => { e.preventDefault(); setAddSection(false) }} ><ImCross style={{ position: 'absolute', right: '7', top: '7' }}></ImCross></button>
                        <input type="text" onChange={(e) => setSectionData(prevState => ({ ...prevState, sectionName: e.target.value }))} id="addSectionInput" placeholder={editMode ? "Edit Section Name..." : "Enter Section Name..."} />
                        <button onClick={(e) => { e.preventDefault(); setAddLecture(true); setSingleSectionData(obj2) }} id="addLectureBtn">Add Lectures</button>

                        <div className="uploadItemsList">{
                            sectionData.videos.map((item, index) => {
                                //console.log(item);
                                return <div className="uploadItemsListInnerDiv1">
                                    <p>{item.video.name}</p>
                                    <ImCross style={{ marginTop: '3px', cursor: 'pointer' }} size={15} onClick={() => removeSubSectionHandler1(index)} />
                                </div>
                            })
                        }
                        </div>


                        {
                            (sectionData.sectionName !== "" || editMode) && <div>
                                <button onClick={editMode ? updateChangesHandler : saveChangesHandler} id="saveChangesAddSection">Save Changes</button>

                            </div>

                        }
                    </div>







                </div>}



                {addLecture && <div className="addLectureDiv">

                    <div className="addLectureBox">
                        <input id="lectureNameInput" type="text" name="title" value={singleSectionData.title} onChange={addSectionHandler} placeholder={"Enter Video Title...."} />
                        <label id="upload" htmlFor="videoUpload">

                            <div>
                                <input type="file" id="videoUpload" name="video" onChange={addSectionHandler} />
                                <IoCloudUpload size={100} style={{ marginLeft: '120px', color: 'black' }}></IoCloudUpload>
                                <p id="dragAndDropUploadDg1">Drag and Drop Upload</p>

                            </div>

                        </label>
                        <div className="addLectureActionBtns">
                            <div className="addLectureActionBtns1">
                                <button onClick={(e) => { e.preventDefault(); setAddLecture(false); setSingleSectionData(obj2) }} id="AddSectionCancelBtn">Cancel</button>
                                <button onClick={editSubsection ? (e) => editSubsectionHandler(e) : saveSingleSectionHandler} id="AddSectionSaveBtn">Save</button>

                            </div>



                        </div>



                    </div>


                </div>}

                {(deleteSectionId || deleteSubsectionId) && <div className="deleteDialogBox">
                    <div className="deleteDialogBoxInnerDiv">
                        <p id="deleteDg1">{`Are you sure, you want to delete this ${deleteSectionId ? `Section` : `Subsection`}?`}</p>
                        <div className="deletedgActionBtns">
                            <button onClick={(e) => { e.preventDefault(); deleteSectionId ? setdeleteSectionId(null) : setdeleteSubSectionId(null) }} id="cancelDelete">Cancel</button>
                            <button onClick={deleteSectionId ? (e) => deleteSectionHandler(e) : (e) => deleteSubSectionHandler(e)} id="proceedDelete">Proceed</button>


                        </div>

                    </div>

                </div>
                }



            </form>
        </div>
    );

    return (
      <div className="editCourseWrapper">
            <Instructor num={4} ></Instructor>
            <div className="instructorCoursesWrapper">
                {typeof user.coursesAsInstructor[0] === 'object' ? user.coursesAsInstructor.map((item, index) => {
                    return <div className="INScourseCard">
                        <img id="INScourseCardImg" src={item.thumbnail} alt="" />
                        <MdEdit onClick={() => { setEdit(true);  setCourseInd(index) }} style={{ position: 'absolute', bottom: '10', left: '12', cursor: 'pointer' }} size={25}></MdEdit>
                        <h1 id="INScourseCardDg1">{`${item.courseName.substring(0, 20)}`}</h1>
                        <p id="INScourseCardDg2">{`₹${item.price}`}</p>

                    </div>

                }) : <Loader></Loader>}
            </div>

        </div>
    );

}
