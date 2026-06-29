export const ProductFormUI = ({
  product,
  errors,
  loading,
  isEdit,
  file,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>{isEdit ? "Editar producto" : "Agregar nuevo producto"}</h2>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            min="0"
            step="0.01"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Imagen {isEdit ? "(opcional)" : "*"}</label>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {errors.file && <p className="error">{errors.file}</p>}
          {isEdit && product.image && !file && (
            <div className="current-image">
              <p>Imagen actual:</p>
              <img src={product.image} alt="Producto" style={{ maxWidth: '100px' }} />
            </div>
          )}
          {isEdit && file && <p>Nueva imagen seleccionada: {file.name}</p>}
        </div>

        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : (isEdit ? "Actualizar" : "Guardar")}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};