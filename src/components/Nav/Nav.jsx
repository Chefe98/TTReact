import { Link } from "react-router-dom";
import "./Nav.css";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from 'react-icons/fa';
export const Nav = () => {
    const {getTotalItems} = useCart();
    const totalItems = getTotalItems()
    return (
        <nav>
            <ul className="nav-list">
                <li>
                    <Link to={"/"} >Home</Link>
                </li>
                <li>
                    <Link to={"/category/dragon-ball-z"} >Dragon ball z</Link>
                </li>
                <li>
                    <Link to={"/category/star-wars"} >Star wars</Link>
                </li>
                <li>
                    <Link to={"/category/resident-evil"} >Resident evil</Link>
                </li>
                <li>
                    <Link to={"/category/alien"} >Alien</Link>
                </li>
                <li>
                    <Link to={"/category/baki"} >Baki</Link>
                </li>
                <li>
                    <Link to={"/category/stranger-things"} >Stranger things</Link>
                </li>
                <li>
                    <Link to="/carrito">
                        <FaShoppingCart />
                        {totalItems > 0 && <span className="incart">{totalItems}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    )
};