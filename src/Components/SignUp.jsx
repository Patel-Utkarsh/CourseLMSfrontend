
import heroImg from "../images/reshot-illustration-city-buildings-at-night-ZMC3EWHAVG.png"
import "../Components/SignUP/signUpcard.css"
import SignUpCard from "./SignUP/SignUpCard";
import { useContext } from "react";
import { AppProvider } from "../data";
import Loader from "./Loader";
function SignUp() {
    const {signUpLoader,setSignUpLoader,loader,setLoader} = useContext(AppProvider);
   
   

  
    if(loader) return <Loader></Loader>
    return (
        <div className="signUpWrapper">
            {
                signUpLoader ? <Loader/> 
                    :
                    <div className="ims">
                         <div className="signUpLeftSection">
                            <img src={heroImg} id="signUpImg" alt="" />
                        </div>
                    <SignUpCard/>

                    </div>


                   
                
                
            }
            

            
        
        </div>
    );
}

export default SignUp