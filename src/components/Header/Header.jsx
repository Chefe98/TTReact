import { Link } from "react-router-dom";
import logo from "../../assets/millennium2-falcon-svgrepo-com.svg";
import "./Header.css";
import { Nav } from "../Nav/Nav";

export const Header = () => {
    return <header>
        <div className="logo-container">
            <Link to={"/"}>
                <img src={logo} alt="logo-react" />
                <span>MILLENNIUM</span>
            </Link>    
        </div>
        <Nav/>
    </header>
}