import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductsById } from "../../services/productsService";


export const ItemDetailContainer = () => {
    const {id} = useParams();

    const [itemDetail, setItemDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    
//si no usamos null, se puede usar un objeto vacio y si tiene clave se usa como mensaje de error, podemos poner en vez de tipo null vacio podemos usar lo del object.kiss itemdetail length entonces si no tiene un largo es porque esta vacio.

    useEffect(() => {
        getProductsById(id)
        .then((data) => setItemDetail(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!itemDetail) return <p>Producto no encontrado</p>;

    return (
        <section>
            <h1>Detalles de productos</h1>
            <div className="products-container detail-container">
                <ItemDetail item={itemDetail}/>
            </div>
        </section>
    )
};