import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../img/logo.png'
const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/fetch-products", label: "All Products" },
    { path: "/admin/add-product", label: "Add Product" },
    { path: "/admin/fetch-orders", label: "Orders" },
    { path: "/admin/fetch-users", label: "Users" },
  ];
  const navigate = useNavigate();
  return (
    <div className="w-64 h-screen bg-[#141414] text-soft-beige flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold p-4 border-b border-warm-yellow">
          Admin Dashboard
        </h2>
        <nav className="flex flex-col gap-4 p-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded ${location.pathname === link.path
                ? "bg-dark-charcoal text-fresh-green"
                : "hover:bg-dark-charcoal hover:text-soft-beige"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className=" border-t border-warm-yellow w-full p-4">
        <img src={logo} alt="logo" className="w-20 cursor-pointer" onClick={() => navigate('/')} />
      </div>
    </div>
  );
};

export default Sidebar;
