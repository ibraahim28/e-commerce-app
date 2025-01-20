import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/fetch-products", label: "All Products" },
    { path: "/admin/add-product", label: "Add Product" },
    { path: "/admin/fetch-orders", label: "Orders" },
    { path: "/admin/fetch-users", label: "Users" },
  ];

  return (
    <div className="w-64 h-screen bg-[#141414] text-soft-beige flex flex-col">
      <h2 className="text-3xl font-bold p-4 border-b border-warm-yellow">
        Admin Dashboard
      </h2>
      <nav className="flex flex-col gap-4 p-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 rounded ${
              location.pathname === link.path
                ? "bg-dark-charcoal text-fresh-green"
                : "hover:bg-dark-charcoal hover:text-soft-beige"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
