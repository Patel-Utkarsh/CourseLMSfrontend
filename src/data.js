import { useState, createContext, useEffect } from "react";

export const AppProvider = createContext();

export default function Data({ children }) {
    const storedToken = localStorage.getItem("token");

    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [user,setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    
    const [cart,setCart] = useState([]);
   
    async function getDetails() {
        const data = await fetch('https://courselms-4.onrender.com/api/v1/getUserDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : user._id})
          });

          const response = await data.json();
          setUser(response.data);
          setCart(response.data.cart)

    }

    useEffect(()=>{
        if(!user) return
        getDetails();

    },[])
        

    const [loader,setLoader] = useState(false)
    const [checkPass, setCheckPass] = useState(false);
    const [fillAllDetails, setFillAllDetails] = useState(false);
    const [selectedRole, setSelectedRole] = useState('student');
    const [signUpLoader, setSignUpLoader] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: '',
        account_type: selectedRole
    })

    function setStars() {
        const filledStars = Math.floor(Math.random() * 11 + 40) / 10; // Generate a random number between 4.0 and 5.0
        const starElements = [];

        for (let i = 0; i < Math.floor(filledStars); i++) {
            starElements.push(
                <span key={i} style={{ color: '#ffcd1f', fontSize: '20px', textShadow: '1px 1px 0px black' }}>★</span>
            );
        }

        const remainingStars = 5 - starElements.length;
        for (let i = 0; i < remainingStars; i++) {
            starElements.push(
                <span key={Math.floor(filledStars) + i} style={{ color: 'gray', fontSize: '20px' }}>☆</span>
            );
        }

        return starElements;

    }

    const testimonials = [
        {
            name: 'Chirly Winston',
            review: "The Full Stack Development course exceeded my expectations. The curriculum was thorough, the instructors were knowledgeable, and the hands-on projects were invaluable for honing my skills. I highly recommend this course to anyone aspiring to become a proficient full stack developer.",
            course: 'Full Stack Web Development'
        },

        {
            name: 'William Roberts',
            review:
                "This course offered invaluable insights into the core principles and practical applications of cloud technology. It provided me with the knowledge and skills needed to leverage cloud computing effectively in my projects.",
            course: 'Cloud Computing Essentials'
        },

        {
            name: 'Charlotte White',
            review:
                "Embark on your entrepreneurial journey with Entrepreneurship 101, where innovative ideas meet practical strategies. Gain the essential skills and insights needed to navigate the dynamic world of business and turn your vision into a successful venture.",
            course: 'Entrepreneurship 101'
        }
    ]

    const value = {
        checkPass, setCheckPass, fillAllDetails, setFillAllDetails, formData, setFormData, selectedRole, setSelectedRole, signUpLoader, setSignUpLoader, testimonials,setStars,token,setToken,user,setUser,cart,setCart,getDetails,loader,setLoader
    }

    return <AppProvider.Provider value={value}>{children}</AppProvider.Provider>





}
