import { Link } from "react-router-dom";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

export const CartView = () => {
const {cart} = useCart()

return <section className="cart-container"> 
    <h1>Tu carrito de compras </h1>
    {cart.length ? (<>
        <CartList/>
        <CartSummary/>
    </>):(
        <>
        <p className="empty-cart">El carrito esta vacio</p>
        <Link to={"/"} className="btn primary bg-primary">Volver</Link>
        </>
    )}
</section>
};