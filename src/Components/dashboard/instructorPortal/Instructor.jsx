import "./instructor.css";
import { IoMdAddCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppProvider } from "../../../data";
import { FaBarsProgress } from "react-icons/fa6";


export default function Instructor(data) {
    const { user } = useContext(AppProvider);
    const style = {
        color: '#a435f0'
    };

    const [selectedNum, setSelectedNum] = useState(data.num);

    return (
        <div className="InstructorWrapper">
            <div className="InstructorInnerDiv1">
                <Link to='/dashboard/MyAccount'>
                    <div className={`InstructorInnerDiv2 ${selectedNum === 1 ? 'selected' : ''}`} onClick={() => setSelectedNum(1)}>
                        <MdDashboard style={style} />
                        <p>My Account</p>
                    </div>
                </Link>

                <Link to='/myCourses'>
                    <div className={`InstructorInnerDiv2 ${selectedNum === 2 ? 'selected' : ''}`} onClick={() => setSelectedNum(2)}>
                        <FaBarsProgress style={style} className="pg" />
                        <p>My Learnings</p>
                    </div>
                </Link>

                {user && user.account_type !== 'student' && (
                    <>
                        <Link to='/dashboard/addNewCourse'>
                            <div className={`InstructorInnerDiv2 ${selectedNum === 3 ? 'selected' : ''}`} onClick={() => setSelectedNum(3)}>
                                <IoMdAddCircle style={style} />
                                <p>Add Courses</p>
                            </div>
                        </Link>
                        <Link to='/dashboard/editCourse'>
                            <div className={`InstructorInnerDiv2 ${selectedNum === 4 ? 'selected' : ''}`} onClick={() => setSelectedNum(4)}>
                                <FaEdit style={style} />
                                <p>Edit Course</p>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
