import "./shoppingIcon.css"
import { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { AppProvider } from "../../../data";
export default function ShoppingIcon() {
   
    const {cart,setCart,getDetails} = useContext(AppProvider);
    //console.log(cart.length)
    const dotStyle = {
        position : 'absolute',
        right :  '-3',
        top : '-8',
        color : '#593efe'
     


    }

    return(
        <div className="ShoppingCartIconWrapper">
            <FaShoppingCart size={33}></FaShoppingCart>
          {!cart.length  ? '' :<GoDotFill style={dotStyle}></GoDotFill> }  
        </div>
    );

}