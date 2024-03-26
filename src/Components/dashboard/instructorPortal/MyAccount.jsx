import { useContext } from "react";
import Instructor from "./Instructor";
import { useState } from "react";
import "./MyAccount.css"
import { AppProvider } from "../../../data";
import { toast } from "react-toastify";

export default function MyAccount() {
    const { user,getDetails } = useContext(AppProvider);


    const [formData, setFormData] = useState({
        gender: '',
        dob: '',
        contact: '',
        about: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      const valueArr = Object.values(formData);
      if(valueArr.includes("")){
        toast.warning('Enter all the fields')
        return;
      }

      const data = await fetch('https://courselms-4.onrender.com/api/v1/updateProfile',{
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({gender : formData.gender,dob : formData.dob,contactNo : formData.contact,about : formData.about,id : user.profile._id})

      })

      const response = await data.json();
      console.log(response);
      if(response.success)toast.success('Data updated Successfully');
      getDetails();
      



       
    };
    return (
        <div className="InsMyAccountWrapperClass">

            <Instructor num={1}></Instructor>
            <div className="InsMyAccountInnerDiv1">
                <div className="InsMyAccountInnerDiv2">
                    <div>
                        <p id="welcomeDg1">Welcome to the Dashboard</p>
                        <p id="welcomeMsgDg2">{`Welcome to our website, ${user.name}! We're excited to have you on board, bringing your expertise and passion to our community of learners. Let's inspire and empower together!`}</p>

                    </div>

                    <img id="heroImgMyAccount1" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1710657024/reshot-illustration-business-startup-WCK4LFVGBA_izvktf.png" alt="" />
                </div>


                <div className="InsMyAccountInnerDiv3">
                    <p id="myprofileDg1">My Profile</p>
                    <form id="myForm" onSubmit={handleSubmit}>
                        <label htmlFor="gender">
                            Gender:
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>

                        <label htmlFor="dob">
                         Date of Birth:
                            
                            <input id="dob" type="date" name="dob" value={formData.dob} onChange={handleChange}  />
                        </label>

                        <label htmlFor="contact">
                            Contact:
                            <input id="contact" type="text" name="contact" value={formData.contact} onChange={handleChange} />
                        </label>

                        <label htmlFor="about">
                            About:
                            <textarea id="about" name="about" value={formData.about} onChange={handleChange}  />
                        </label>

                        <button type="submit">Save Changes</button>
                    </form>


                </div>


            </div>


        </div>
    );

}
