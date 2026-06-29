import { useNavigate, useParams } from "react-router-dom";
import "./ProductFormContainer.css";
import { useState, useEffect } from "react";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../utils/validateProduct";
import { uploadImage } from "../../services/uploadImage";
import { createProduct, updateProduct, getProductsById } from "../../services/productsService";

export const ProductFormContainer = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [initialLoading, setInitialLoading]=useState(isEdit);

  useEffect(() => {
   if (isEdit) {
      const fetchProduct = async () => {
        try {
          const data = await getProductsById(id);
          if (!data) {
            setErrors({ general: "Producto no encontrado" });
            return;
          }
          setProduct({
            name: data.name || "",
            description: data.description || "",
            price: data.price?.toString() || "",
            category: data.category || "",
            image: data.image || "",
          });
        } catch (error) {
          setErrors({ general: "Error al cargar el producto" });
          console.error(error);
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //modificamos los estados para el "loading mientras se procesa"
    setErrors({});
    setLoading(true);

    //validar
    const newErrors = validateProduct({ ...product, file }, isEdit);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      let imageUrl = product.image; // valor actual (si existe)

      // Si se seleccionó un archivo nuevo, lo subimos
      if (file) {
        imageUrl = await uploadImage(file);
      }

      const productData = {
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        category: product.category.trim(),
        image: imageUrl,
      };

      if (isEdit) {
        await updateProduct(id, productData);
        navigate("/admin/products");
      } else {
        const newId = await createProduct(productData);
        navigate(`/admin/products/success/${newId}`);
      }
    } catch (error) {
      setErrors({ general: error.message || "Error al guardar el producto" });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="admin-list-loading">Cargando producto...</div>;
  }

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      isEdit={isEdit}
      file={file}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};