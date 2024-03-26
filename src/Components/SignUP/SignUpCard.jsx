import { useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import heroImg from "./../../images/reshot-illustration-city-buildings-at-night-ZMC3EWHAVG.png"

import "../SignUP/signUpcard.css"
import { AppProvider } from "../../data";
import { toast } from "react-toastify";
import Loader from "../Loader";
function SignUpCard() {
    const navigate = useNavigate();

    const { loader, setLoader } = useContext(AppProvider);
    const [meterColor, setMeterColor] = useState('gray')
    const { selectedRole, setSelectedRole } = useContext(AppProvider);
    const { checkPass, setCheckPass } = useContext(AppProvider);
    const { fillAllDetails, setFillAllDetails } = useContext(AppProvider);
    const { formData, setFormData } = useContext(AppProvider);
    const [modal, setModal] = useState(false);
    const [inputArr, setInputArr] = useState(["", "", "", ""])
    console.log(modal)

    async function submitHandler() {

        const arr = Object.values(formData);
        if (arr.includes("")) {
            setFillAllDetails(true);
            return;

        }
        setLoader(true);


        const data = await fetch('https://courselms-4.onrender.com/api/v1/sendOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({ email: formData.email })

        })

        const response = await data.json();
        console.log(response);
        setLoader(false);
        if (response.success) {
            setModal(true);
        }


    }



    const handleRoleChange = (role) => {
        console.log('entered here first')
        setSelectedRole(role);
    };


    useEffect(() => {
        console.log('entered');
        formHandler({ target: { name: 'account_type', value: selectedRole } });

    }, [selectedRole])

    useEffect(() => {
        if (formData.password.length == 0) {
            setMeterColor('gray');
        }
        else if (formData.password.length <= 5) {
            setMeterColor('red');
        }

        else if (formData.password.length < 8 && formData.password.length > 5) {
            setMeterColor('yellow');

        }

        else {
            setMeterColor('green');


        }

    }, [formData.password]);


    function eyeclickHandler() {
        setCheckPass(!checkPass);
    }

    const payload = {
        position: 'relative',
        top: -25,
        right: -430,
        cursor: 'pointer',
    }

    function formHandler(e) {
        //console.log(e);

        const { name, value } = e.target;
        //console.log(name,value)
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));





    }
    // console.log(2,formData)

    if(loader) return <Loader></Loader>



    if (modal) {
        console.log(inputArr);

        function OTPchangeHandler(e, index) {
            const newArr = [...inputArr];
            newArr[index] = e.target.value;
            setInputArr(newArr);


        }

        async function signUpHandler() {
            if (inputArr.includes("")) {
                toast.error('Enter 4 digit OTP');
                return;
            }

            const otp = inputArr.join('');
            setLoader(true);

            const data = await fetch('https://courselms-4.onrender.com/api/v1/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },


                body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password, account_type: formData.account_type, otpInput: otp })

            })

            const response = await data.json();
            setLoader(false)
            if (response.success) {
                toast.success('Account Created Successfully')
                setTimeout(() => {
                    navigate('/')


                }, [4000])
                return
            }

            else {
                toast.error(`${response.message}`)

            }


        }

        return (
            <div className="OTPmodalWrapper">
                <div className="OTPinnerDiv1">
                    <ImCross onClick={() => setModal(false)} style={{ position: 'absolute', right: '20px', cursor: 'pointer' }}></ImCross>

                    <img id="OTPimg" src="https://res.cloudinary.com/dhfas7qft/image/upload/v1710833118/locked_1_lase4d.png" alt="" />
                    <h1 id="OTPinputDg1">Enter OTP</h1>
                    <p id="OTPdg2">OTP has been mailed to you</p>

                    <div className="OTPinputClass">
                        {inputArr.map((item, index) => {
                            return (<input className="OTPinput" maxLength={1} onChange={(e) => OTPchangeHandler(e, index)} type="text" />)
                        })}


                    </div>
                    <button onClick={signUpHandler} id="OTPsubmitBtn">Submit</button>

                </div>



            </div>
        )
    }

    return (
        <div className="signUpWrapper">

            <div className="ims">
                <div className="signUpLeftSection">
                    <img src={heroImg} id="signUpImg" alt="" />
                </div>

                <div className="signUpRightSection">
                <h1 id="signUpHeading">Sign Up</h1>
                <p id="signUptext">Unlock a world of knowledge! Join our community and embark on an educational journey with our diverse range of courses. Sign up today to access expertly crafted content and elevate your skills in the evolving landscape of technology</p>
                <div className="fillAllDetailsDiv">
                    {fillAllDetails ? <div id="fillDetails"><span id="errorABC"><MdError />Please Fill All the Details</span></div> : null}

                </div>

                <input placeholder="Full Name" type="text" name="name" onChange={formHandler} value={formData.name} />
                <input placeholder="Email Address" type="text" name="email" onChange={formHandler} />

                <div className="passWordDiv" onChange={formHandler}>
                    <input id="abc" placeholder="Password" name="password" type={checkPass ? 'text' : 'password'} />
                    {
                        checkPass ? <FaEyeSlash style={payload} onClick={eyeclickHandler} /> : <FaEye style={payload} onClick={eyeclickHandler} />

                    }
                    <div className="passMatchingDiv">
                        <div id="passMeter" style={{ backgroundColor: meterColor }}></div>
                        {formData.password != formData.confirmPass && formData.confirmPass.length > 0 ? <div className="passError"><span id="errorSpan"><MdError /></span>Password Not Matching </div> : ''}

                    </div>


                </div>

                <input placeholder="Confirm Password" type="password" name="confirmPass" onChange={formHandler} />

                <div className="role-switch-container">
                    <div
                        className={`role-option ${selectedRole === 'student' ? 'active' : ''}`}
                        onClick={() => handleRoleChange('student')} name="account_type"
                    >
                        Student
                    </div>

                    <div
                        className={`role-option ${selectedRole === 'instructor' ? 'active' : ''}`}
                        onClick={() => handleRoleChange('instructor')} name="account_type"
                    >
                        Instructor
                    </div>
                </div>

                <button id="nextBtn" onClick={submitHandler}>Next</button>


            </div>
                

            </div>


           
        </div>
    );
}

export default SignUpCard
