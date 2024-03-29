import { useContext, useEffect, useState } from "react"
import { AppProvider } from "../../../data"
import { useNavigate } from "react-router-dom";
import "./shoppingCart.css"

export default function ShoppingCart() {
    const navigate = useNavigate();
    const {user} = useContext(AppProvider);
    const {cart,setStars,getDetails} = useContext(AppProvider);
    const [cartValue,setCartValue] = useState(0);
    console.log(user);
    useEffect(()=>{
        getCartValue();
    },[cart])
    if(!user) {
        navigate('/login');
        return;
        
    }

   

    function getCartValue() {
        let total = 0
        cart.forEach((item)=>{
            total += parseInt(item.price);
        })

        setCartValue(total);
    }

    

    async function removeCart(id) {


        const data = await fetch('https://courselms-4.onrender.com/api/v1/deleteFromCart',{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                id : user._id,
                course_id : id
             
            })

        });

        const response = await data.json();
        getDetails();


    }

    async function checkoutHandler() {
        if(!user) {
            navigate('/login');
            return
        }
        const data = await fetch('https://courselms-4.onrender.com/api/v1/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user._id,
                course_id: user.cart
            })
        });
    
        const response = await data.json();
        console.log(response);
    
        if (response) {
            let newOptions = response.options;
            newOptions.handler = async ()=>{
                const successReq = await fetch('https://courselms-4.onrender.com/api/v1/verifySignature', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user._id,
                        courseId: user.cart
                    })
                });

                const res = await successReq.json();
                getDetails();
                navigate('/order/success')


            }
          
            
            const rzp = new window.Razorpay(newOptions);
            rzp.open();
        }
    }

   
   

    return (
        cart.length > 0?
        <div className="shoppingCartWrapper">
      
        <h1 id="shoppingCart">Shopping Cart</h1>
        <p id="cartLength">{`${cart.length} Courses in the cart`}</p>
        <div className="shoppingCartWrapperInnerDiv1">
            <div className="shoppingCartWrapperInnerDiv2">
                {
                    cart.map((item)=>{
                        return (
                           <div className="shoppingCartWrapperInnerDiv4">
                                <img id="imgThumb" src={item.thumbnail} alt="" />
                                <div className="shoppingCartWrapperInnerDiv5">
                                    <p id="shoppingCartWrapperInnerDiv5D1">
                                        {item.courseName}
                                    
                                    </p>

                                    <div className="shoppingCartWrapperInnerDiv6">
                                        <div className="SingleCourseDiv1InnerDiv1D4">Bestseller</div>
                                        <div>{setStars()}</div>

                                    </div>
                                </div>

                                <button id="removebtn" onClick={()=>removeCart(item._id)}>remove</button>
                                <p id="shoppingCartWrapperInnerDiv4D2">{`₹${item.price}`}</p>
                           </div>
                        )

                    })
                }


            </div>
            <div className="shoppingCartWrapperInnerDiv3">
                <p id="totalDg">Total:</p>
                <p id="totalVal">
                    {`₹${cartValue}`}

                

                </p>
                <button onClick = {checkoutHandler} id="checkoutBtn">Checkout</button>
            </div>

        </div>

    </div> :

    <div className="EmptyCartWrapperClass">
        <div className="EmptyClassInnerDiv">
            <p id="emptyClassDg1">Your Cart is Empty</p>
            <button id="emptyClassAction1" onClick={()=>navigate('/courses')}>Shop Now</button>
        </div>
    </div>
    
    );
}
