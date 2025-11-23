import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  /* LOAD CART COUNT */
  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      const total = stored.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    loadCart();
    window.addEventListener("cart-updated", loadCart);

    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  /* HANDLE SEARCH */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") return;

    navigate(`/products?search=${searchText}`);
    setSearchText("");
  };

  /* ACTIVE MENU STYLE */
  const navClass = ({ isActive }) =>
    `relative px-3 py-1 font-medium transition ${
      isActive
        ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-white"
        : "text-white/80 hover:text-white"
    }`;

  return (
    <nav className="bg-red-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            Srivilize
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navClass}>หน้าแรก</NavLink>
            <NavLink to="/products" className={navClass}>สินค้าทั้งหมด</NavLink>
            <NavLink to="/about" className={navClass}>เกี่ยวกับเรา</NavLink>
            <NavLink to="/contact" className={navClass}>ติดต่อ</NavLink>
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center gap-6">

            {/* SEARCH BAR */}
            <form onSubmit={handleSearch} className="relative w-56 hidden md:block">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="ค้นหา..."
                className="w-full h-10 bg-white/10 border border-white/20 
                  rounded-full pl-4 pr-10 text-white text-sm placeholder-white/60
                  outline-none focus:border-white/40 transition"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                </svg>
              </button>
            </form>

            {/* CART ICON */}
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white hover:text-white/90 transition"
                fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.08.84l.383 1.533m0 0L6 12.75m-.901-7.377h13.188a1.125 1.125 0 0 1 1.1 1.36l-1.35 6a1.125 1.125 0 0 1-1.1.865H6.375M6 12.75a2.25 2.25 0 1 0 0 4.5m12-4.5a2.25 2.25 0 1 1 0 4.5m-12 0h12" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 
                  font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER ICON → GO LOGIN */}
            <Link to="/login" className="hover:opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white transition"
                fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M5.5 20a9 9 0 1 1 13 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
            </Link>

            {/* MOBILE MENU ICON */}
            <button
              className="md:hidden text-white text-3xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-red-500 px-6 pb-4 space-y-2">
          <MobileItem to="/" label="หน้าแรก" close={setIsMenuOpen} />
          <MobileItem to="/products" label="สินค้าทั้งหมด" close={setIsMenuOpen} />
          <MobileItem to="/about" label="เกี่ยวกับเรา" close={setIsMenuOpen} />
          <MobileItem to="/contact" label="ติดต่อ" close={setIsMenuOpen} />
        </div>
      )}
    </nav>
  );
};

const MobileItem = ({ to, label, close }) => (
  <NavLink
    to={to}
    onClick={() => close(false)}
    className="block py-2 text-white text-lg"
  >
    {label}
  </NavLink>
);

export default Navbar;
