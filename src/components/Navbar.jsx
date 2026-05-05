import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const link = (to, label) => {
    const isActive = pathname === to;

    return (
      <Link
        to={to}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-black text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100 hover:text-black"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo / Brand */}
        <div className="text-sm sm:text-lg  font-semibold tracking-tight">
          Image Admin
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 text-sm">
          {link("/", "Gallery")}
          {link("/admin", "Admin")}
        </div>
      </div>
    </nav>
  );
}