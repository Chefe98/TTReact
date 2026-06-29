import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productsService';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError('Error al cargar los productos');
          console.error(err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Seguro que querés eliminar el producto "${name}"?`)) return;
    try {
      await deleteProduct(id);
      await loadProducts(); // recargar lista
    } catch (err) {
      alert('Hubo un error al eliminar el producto.');
      console.error(err);
    }
  };

  if (loading) return <div className="admin-list-loading">Cargando productos...</div>;
  if (error) return <div className="admin-list-error">{error}</div>;

  return (
    <div className="admin-product-list">
      <h2>Lista de Productos</h2>
      <div className="admin-list-actions">
        <Link to="/admin/products/new" className="btn-add">+ Agregar producto</Link>
      </div>
      <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="5">No hay productos cargados.</td></tr>
          ) : (
            products.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img 
                    src={prod.image || 'https://via.placeholder.com/50'} 
                    alt={prod.name} 
                    className="admin-thumbnail"
                  />
                </td>
                <td>{prod.name}</td>
                <td>${prod.price?.toFixed(2) || '0.00'}</td>
                <td>{prod.category || 'Sin categoría'}</td>
                <td>
                  <Link to={`/admin/products/edit/${prod.id}`} className="btn-edit">Editar</Link>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(prod.id, prod.name)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ProductList;