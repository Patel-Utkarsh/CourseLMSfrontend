import React, { useContext, useEffect, useState } from "react";
import "./courseCreation.css"; // Import CSS file for styling
import { toast } from "react-toastify";
import { AppProvider } from "../../../data";
import Loader from "../../Loader";
import Instructor from "./Instructor";
export default function CreateCourse() {
    const {user,loader,setLoader,getDetails} = useContext(AppProvider);
    

    const [categoryData, setCategoryData] = useState([]);
    const [validData,setValidData] = useState(true);
    const [thumbnail,setThumbnail] = useState(null)
    const [courseData, setCourseData] = useState({
        courseName: "",
        courseDescription: "",
        category: "",
        price: "",
        whatWillyouLearn: "",
        published : false,
        id : user._id
    });
  

    async function getCategories() {
        const data = await fetch('https://courselms-4.onrender.com/api/v1/getAllCategories');
        const categories = await data.json();
        setCategoryData(categories.data);


    }

    async function createCourse() {
        setLoader(true)
        const formData = new FormData();
        Object.entries(courseData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        formData.append('file',thumbnail)

        const data = await fetch('https://courselms-4.onrender.com/api/v1/createCourse',{
            method: 'POST',
            body: formData,
          
        })
        const response = await data.json();
        setLoader(false);
        if(response.success) {
            toast.success('Course Created Successfully');
            getDetails();
            return

        }

        toast.error('course couldnt be created');
    


    }

    useEffect(() => {
        getCategories();
    }, [])

    const handleChange = (e) => {

        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(courseData).some(item => item === "");
        if(isEmpty){
            toast.warn('Please Fill all the Fields');
            return

        } 

        const priceNumeric = parseFloat(courseData.price);
        if (isNaN(priceNumeric)) {
          toast.warn('Price must be a valid number');
          return; 
        }

        createCourse();

        
    };

    function handleFileChange(e) {
        const file = e.target.files[0];
        setThumbnail(file);

    }

    if(loader) return <Loader></Loader>


    return (
        <div className="CreateCourseWrapper">
            <Instructor num = {3}></Instructor>
            <form className="course-form" onSubmit={handleSubmit}>
            <h2>Create a New Course</h2>
            <div className="form-group">
                <label htmlFor="title">Course Title:</label>
                <input
                    type="text"
                    id="title"
                    name="courseName"
                    value={courseData.title}
                    onChange={handleChange}
                    placeholder="Enter course title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="shortDescription">Short Description:</label>
                <textarea
                    id="shortDescription"
                    name="courseDescription"
                    value={courseData.courseDescription}
                    onChange={handleChange}
                    placeholder="Enter short description"
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Enter Price</label>
                <input type="text" name="price" id="price" placeholder="Price" value={courseData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="priceCategory">Category:</label>
                <select
                    id="Category"
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}
                >
                    <option value="">Select Course Category</option>
                    {categoryData ? categoryData.map((item) => {
                        return <option value={item.name}>{item.name}</option>

                    }) : ''}
                </select>
            </div>



            <div className="form-group">
                <label htmlFor="">Thumbnail</label>
                <input type="file"  onChange={handleFileChange} />
            </div>

            <div className="form-group">
                <label htmlFor="shortDescription">Benefits:</label>
                <textarea
                    id="whatWillyouLearn"
                    name="whatWillyouLearn"
                    value={courseData.whatWillyouLearn}
                    onChange={handleChange}
                    placeholder="Benefits of this course"
                />
            </div>


            <button type="submit" id="createCourseAction">Next</button>
        </form>

        </div>
      
        
    );



}



