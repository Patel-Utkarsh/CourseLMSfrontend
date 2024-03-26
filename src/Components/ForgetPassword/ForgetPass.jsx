import "./ForgetPass.css"
import disImg from "../../images/10073364.jpg"
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppProvider } from "../../data";
import Loader from "../Loader";
export default function ForgetPass() {
    const {loader,setLoader} = useContext(AppProvider);
    const [inputMail,setInputMail] = useState("");
    console.log(inputMail)
    async function resetHandler(){
        if(inputMail === "") {
            toast.warn('Please fill the field');
            return
        }
        setLoader(true);

        const data = await fetch('https://courselms-4.onrender.com/api/v1/forgetPassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({email : inputMail})
            
        })

        const response = await data.json();
        setLoader(false)
        if(response.success) toast.success('Reset link mailed to you');
        else{
            toast.error('Account doent exist');
        }

        setInputMail("");

    }

    if(loader) {
        return <Loader></Loader>
    }

    return (
        <div  className="ForgetPassWrapper">
            <div className="ForgetPassInnerDiv1">
                <img id="disImg" src={disImg} alt="" />
                <div className="ForgetPassInnerDiv2">
                    <h1 id="forgetPassDg1">Forgot Password?</h1>
                    <p id="forgetPassDg2">Don't worry, we've got you covered. Just follow the steps to reset it securely.</p>
                    <input onChange={(e)=>setInputMail(e.target.value)} id="forgetPassInput" type="text" placeholder="Enter Email" />
                    <button onClick={resetHandler} id="resetPassBtn">Reset Password</button>

                </div>

            </div>

        </div>
    );
}
