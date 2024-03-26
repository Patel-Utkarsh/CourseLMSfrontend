import { useContext, useState } from "react";
import "./testimonial.css"
import { AppProvider } from "../../data";
import image1 from "../../images/84ce06432355d2548c4c2d534bb8873e.jpeg"
import image2 from "../../images/professionalImg.jpeg"
import image3 from "../../images/speaker_04-300x300.jpeg"
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";


const arrImg = [
    image1,
    image2,
    image3
]

console.log(arrImg)



export default function Testimonial() {
    const {testimonials} = useContext(AppProvider);
    const [index, setIndex] = useState(0);
  

    const iconProp1 = {
        position : 'absolute',
        top : '50%',
        cursor : 'pointer'
        

    }

    const iconProp2 = {
        position : 'absolute',
        top : '50%',
       
        right : '0',
        cursor  : 'pointer'
        

    }

    function incrementHandler() {
        if(index + 1 > 2) {
            setIndex(0);
            return
        }

        setIndex(index+1);
      

    }

    function decrementHandler() {
        if(index - 1 < 0) {
            setIndex(2);
            return
        }

        setIndex(index-1);
      

    }


    
    return (
        <div className="TestimonialDiv1">
            <div className="TestimonialDiv1InnerDiv1">
                <img id="TestimonialDiv1InnerDiv1Img1" src={arrImg[index]} />
                <div className="TestimonialDiv1InnerDiv2">
                    <h1 id="TestimonialDiv1InnerDiv2D1">{testimonials[index].name}</h1>
                    <p id="TestimonialDiv1InnerDiv2D2">{testimonials[index].course}</p>
                </div>
            </div>
            <p id="TestimonialDiv1D1">{`" ${testimonials[index].review} "`}</p>

            <FaAngleLeft style={iconProp1} size={40} onClick={decrementHandler}></FaAngleLeft>
            <FaAngleRight style={iconProp2} size={40} onClick={incrementHandler}></FaAngleRight>

        </div>

    );
}