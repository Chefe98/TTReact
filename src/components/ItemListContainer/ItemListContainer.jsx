import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { ItemList } from "../ItemList/ItemList";

export const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/data/products.json")
        .then((res) =>{
            if (!res.ok) {
                throw new Error("No se puedieron cargar los productos");
            }
            return res.json();
        })
        .then((data) => setProducts(data))
        .catch((err) => {
            console.log(err);
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    },[]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    return (
        <section>
            <ItemList products={products} />
        </section>
    );
};