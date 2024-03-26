import { useContext, useState } from "react";
import "./ResetPassword.css"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppProvider } from "../../data";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
export default function Reset(){
    const navigate = useNavigate();
    const [password,setPassword] = useState({
        inputPass : "",
        confirmPass : ""
    })
    const {loader,setLoader} = useContext(AppProvider)

    const {token} = useParams();


    function passWordChangeHandler(e) {
        const {value,name} = e.target;

       setPassword((prev)=>{
        return {
            ...prev,
            [name] : value
        }
       })
    }

    async function resetHandler() {
        if(!password.inputPass || !password.confirmPass || password.inputPass != password.confirmPass) {
            toast.error('Enter the fields correctly');
            return
        }
        setLoader(true)

        const data = await fetch('https://courselms-4.onrender.com/api/v1/resetPass',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({token,password : password.confirmPass})
            
        })

        const response = await data.json();
        setLoader(false)
        if(response.success) {
            toast.success('Password Changed Successfully')
            setTimeout(()=>{
                navigate('/login');

            },3000)
            
            return
        }

        toast.error('Token Expired')
        setTimeout(()=>{
            navigate('/forget-password');

        },3000)
        



    }

    if(loader) return <Loader></Loader>

    return(
        <div className="ResetPassWrapperClass">
            <div className="ResetPassInnerDiv1">
                <img id="resetPassLockImg" src={`https://res.cloudinary.com/dhfas7qft/image/upload/v1710818170/locked_uarrip.png`} alt="" />
                <div className="resetinputDiv">
                    <input className="Pass" name="inputPass" onChange={passWordChangeHandler} id="inputPass" type="text" placeholder="Enter New Password" />
                    <input className="Pass" name="confirmPass" onChange={passWordChangeHandler} id="confirmPass" type="password" placeholder="Confirm New Password" />
                </div>
                <button onClick={resetHandler} id="resetPassButton">Reset Password</button>

            </div>
        </div>
    );

}
