import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#1e1e1e" }}>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/products/new">Nuevo producto</Link>
        <button onClick={logout} style={{ marginLeft: "auto" }}>Cerrar sesión</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};