import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
export default function Footer() {
    const booksStyle = {
        color: '#543ee8',
        display: 'inline',
    
    }
    return(
        <div className="Footer">
        <div className="FooterInnerDiv1">
            <div className="FooterInnerDiv2">
                <h1 id="FooterInnerDiv2InnerD1">QuickLearn</h1>
                <p id="FooterInnerDiv2InnerD2">
                    Choose From Over 4,000 Courses On Topics Like Business, Skills ,UI/UX Design,
                    Web Development And Much More
                </p>
                <p id="FooterInnerDiv2InnerD3"><FaLocationDot style={booksStyle} />

                    463 7th Ave, NY 10018, USA

                </p>

                <p id="FooterInnerDiv2InnerD4"><IoCallOutline style={booksStyle} />

                    +123-88-9900-456
                </p>


            </div>
            <div className="FooterInnerDiv2">
                <h1 id="FooterInnerDiv2InnerD1">Resources</h1>
                <Link>About</Link>
                <Link>Contact</Link>
                <Link>Refund</Link>
             
                <Link>Return Policy</Link>
                <Link>Terms and Conditions</Link>

            </div>

            <div className="FooterInnerDiv2">
            <h1 id="FooterInnerDiv2InnerD1">Courses</h1>
                <Link>Business</Link>
                <Link>Development</Link>
                <Link>Finance</Link>
                <Link>Technology</Link>
                <Link>Art & Design</Link>
            </div>

            <div className="FooterInnerDiv2">
                <h1 id="FooterInnerDiv2InnerD1">Join Our NewsLetter</h1>
                <div className="FooterInnerDiv3">
                    <input id="FooterInnerDiv2InnerD1Inp1" type="text" />
                    <button id="ActionBtn5">Sign Up</button>
                </div>

                <p>We Only Send Interesting And Relevant Emails.</p>


            </div>

        </div>

    </div>

    );
}