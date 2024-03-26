import "./category.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseCard from "../Home/CourseCard";


export default function Category() {
    const { categoryName } = useParams();
    const [categoryData, setCategoryData] = useState([]);
    const navigate = useNavigate();

    const [allCourse, setAllCourses] = useState([]);
    const [course, setCourse] = useState([]);



    async function getAllCourse() {
        const coursesJson = await fetch('https://courselms-4.onrender.com/api/v1/getAllCourses');
        const courses = await coursesJson.json();
        console.log(courses);
        setAllCourses(courses.courses);
        setCourse(courses.courses);

    }

    async function getCategories() {
        const data = await fetch('https://courselms-4.onrender.com/api/v1/getAllCategories');
        const categories = await data.json();
        setCategoryData(categories.data);


    }

    useEffect(() => {
        if (allCourse.length > 0 && categoryName) {
            const filteredCourses = allCourse.filter(course => course.category.name === categoryName);
            if (filteredCourses.length === 0) {
              
                return;
            }
            setCourse(filteredCourses);
        }

        else {
            setCourse(allCourse);
        }
    }, [allCourse]);

    function handleChange(id) {
        navigate(`/category/${id}`);
        getAllCourse();

    }



    useEffect(() => {
        getAllCourse()
        getCategories()
    }, []);
    return (
        <div className="CategoryWrapper">
            <div className="categoryMainDiv">
                <div className="categoryInnerDiv1">
                    <p id="categoryInnerDiv1D1">Categories</p>
                    <div className="categoryInnerDiv2">
                        {categoryData.length > 0 ?
                            categoryData.map((item) => {
                            
                                return (
                                    <div className="categorySidebar">
                                        <label key={item}>
                                            <input id="categoryCheckbox"
                                                type="checkbox"
                                                value={item}
                                                checked={item.name === categoryName}
                                                onChange={() => handleChange(item.name)}
                                            />

                                        </label>

                                        <div id="catName">{item.name}</div>


                                    </div>

                                );
                            })


                            : ''}
                    </div>
                </div>


                <div className="categoryInnerDiv3">
                {
                    course.map((item) => {
                        return <CourseCard data={item} ></CourseCard>
                    })
                }
            </div>

            </div>

          

        </div>
    );

}
