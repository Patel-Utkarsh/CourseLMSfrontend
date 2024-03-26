import "./login.css"
import { useState,useEffect, useContext } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { AppProvider } from "../../../data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Loader"


export default function Login() {
    const navigate = useNavigate();

    const {token,setToken,setUser,loader,setLoader}= useContext(AppProvider);
    const [emptyFields,setEmptyFields] = useState(false);
    const [authData,setAuthData] = useState({
        email : '',
        password : ''
    });


    function submitHandler() {
        Object.values(authData).forEach((key) => {
            //console.log(key,formData[key]);
            if(key === "") {
                setEmptyFields(true);
                return;
            }
        })

        dataAuth();
    }

    async function dataAuth() {
        setLoader(true);
        const data = await fetch('https://courselms-4.onrender.com/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(authData)
        });

        const validData = await data.json();
        if(validData.success) {
            localStorage.setItem("token",JSON.stringify(validData.token));
            localStorage.setItem("user", JSON.stringify(validData.user));

            setToken(validData.token);
            setUser(validData.user);

            toast.success('Logged In Successfully')
            setLoader(false);
            setTimeout(() => {
                navigate('/dashboard/MyAccount')
                
            }, 1500);

            return

        }

        toast.error('Wrong Credentials')



       


    }


    function formHandler(e) {
        setEmptyFields(false)
        const { name, value } = e.target;
        setAuthData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

  if(loader) return <Loader></Loader>
    

    return (
        <div className="loginWrapper">
          
        
          <div className="LoginMainDiv">
          {
                emptyFields ? 
                <div className="errorClassLogin">
                    <MdError style={{marginRight : '10px',marginTop : '2px'}}></MdError>
                    <p>Please Fill All the Details</p>
                    

                </div>

                :
                ''
            }
            <h1 id="loginDlg">Log In</h1>
            <input id="em" type="email" name="email" onChange={formHandler} placeholder="Email" />
            <input id="em" type="password" name= "password" onChange={formHandler} placeholder="Password" />
             <Link to={'/forget-password'}><p id="forgotPassDialog">Forgot Password?</p></Link>
            <button id="login" onClick={submitHandler}>Log In</button>

          </div>
        </div>
    );
}
