import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/OrderUKLogo.png";
import locationIcon from "../../assets/LocationIcon.png";
import basketIcon from "../../assets/Full Shopping Basket.png";
import arrowDownIcon from "../../assets/Forward Button.png";
import { Menu, ChevronDown } from 'lucide-react';
import ThemeToggle from '/src/components/common/ThemeToggle';
import { HashLink } from "react-router-hash-link";
import { useAuthModal } from "/src/context/AuthModalContext";
import { useAuth } from "/src/context/AuthContext";
import { getRestaurants } from "/src/api/restaurantAPI";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Menu", path: "/#menu" },
  { label: "Special Offers", path: "/offers" },
  { label: "Restaurants", path: "/restaurant" },
  { label: "Track Order", path: "/orders/track" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { openLogin } = useAuthModal();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data || []);
      } catch (error) {
        console.error("Failed to fetch restaurants for nav dropdown:", error);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      {/* ══════════════════════ DESKTOP (unchanged) ══════════════════════ */}
      <div className="hidden lg:block">
        {/* ── Top promo / utility strip ─────────────────────────── */}
        <div
          className="w-full mx-auto bg-brand-offwhite border-b border-x border-black/10 rounded-b-card overflow-hidden font-body text-black"
          style={{ maxWidth: "1528px" }}
        >
          <div className="h-[70px] flex items-center justify-between px-[137px] gap-0">
            {/* Promo text */}
            <div className="flex items-center gap-2 text-[15px] font-medium">
              <span className="text-[25px] leading-none">🌟</span>
              <p className="leading-snug">
                Get 5% Off your first order,{" "}
                <span className="text-brand-orange font-bold underline cursor-pointer">
                  Promo: ORDER5
                </span>
              </p>
            </div>

            {/* Right side */}
            <div className="flex items-center justify-end gap-9">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={locationIcon}
                  alt="Location Pin"
                  className="w-[25px] h-[25px] object-contain shrink-0"
                />
                <span className="text-[15px] font-medium text-brand-dark truncate">
                  Regent Street, A4, A4201, London
                </span>
                <button className="text-[14px] font-medium text-brand-orange underline hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap">
                  Change Location
                </button>
              </div>

              {/* Basket */}
              <div className="flex items-center bg-brand-green border border-black/10 rounded-br-card text-white font-body h-full w-[378px]">
                <div className="flex items-center justify-center px-2 flex-1">
                  <img
                    src={basketIcon}
                    alt="Basket"
                    className="w-[43px] h-[43px] object-contain"
                  />
                </div>

                <div className="h-full w-px bg-white/30" />

                <div className="w-[112px] flex items-center justify-center font-semibold text-[16px]">
                  23 Items
                </div>

                <div className="h-full w-px bg-white/30" />

                <div className="flex items-center justify-center w-[116px] font-semibold text-[16px]">
                  GBP 79.89
                </div>

                <div className="h-full w-px bg-white/30" />

                <button className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer rounded-br-card">
                  <img
                    src={arrowDownIcon}
                    alt="Go to checkout"
                    className="w-[38px] h-[38px] object-contain rotate-90"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav row */}
        <div
          className="w-full mx-auto"
          style={{ maxWidth: "1528px", marginTop: "38px" }}
        >
          <div className="px-6 flex items-center justify-between">
            <Link to="/">
              <img
                src={logo}
                alt="Order UK Logo"
                className="w-[215px] h-auto object-contain"
              />
            </Link>

            <nav className="flex items-center gap-8 font-nav text-sm font-semibold">
              {navLinks.map((link) =>
                link.label === "Browse Menu" ? (
                  <HashLink
                    key={link.label}
                    smooth
                    to="/#menu"
                    className="w-[127px] h-[45px] text-brand-dark hover:text-brand-orange flex items-center justify-center transition-colors duration-200"
                  >
                    {link.label}
                  </HashLink>
                ) : link.label === "Restaurants" ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`w-[127px] h-[45px] flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer ${
                        dropdownOpen || window.location.pathname.startsWith("/restaurant")
                          ? "bg-brand-orange text-white rounded-pill"
                          : "text-brand-dark hover:text-brand-orange"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[220px] bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-[12px] shadow-lg py-2 z-50 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-orange">
                        {restaurants.length === 0 ? (
                          <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">Loading...</div>
                        ) : (
                          restaurants.map((r) => (
                            <button
                              key={r.id}
                              onClick={() => {
                                setDropdownOpen(false);
                                navigate(`/restaurant/${r.id}`);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-brand-dark dark:text-white hover:bg-brand-orange/10 hover:text-brand-orange transition-colors duration-150 cursor-pointer block truncate"
                            >
                              {r.name}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      isActive
                        ? "w-[127px] h-[45px] bg-brand-orange text-white rounded-pill flex items-center justify-center transition-colors duration-200"
                        : "w-[127px] h-[45px] text-brand-dark hover:text-brand-orange flex items-center justify-center transition-colors duration-200"
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />

              {user ? (
                <div className="flex items-center gap-3">

                  <div className="flex items-center gap-2">
                    <div className="w-[40px] h-[40px] rounded-full bg-brand-orange flex items-center justify-center text-white font-bold">
                      {user.username.charAt(0).toUpperCase() || "U"}
                    </div>

                    <span className="font-semibold text-brand-dark">
                      {user.username.toUpperCase() || "User"}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="text-brand-orange font-semibold"
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <button
                  type="button"
                  onClick={openLogin}
                  className="w-[234px] h-[61px] bg-brand-dark text-white rounded-pill flex items-center justify-center gap-3 font-nav text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <div className="w-[30px] h-[30px] bg-brand-orange rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
                    </svg>
                  </div>

                  <span>Login/Signup</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════ MOBILE (Modified Segment Layer) ══════════════════════ */}
      <div className="lg:hidden w-full relative">
        {/* Row 1: Logo + Theme Toggle + Hamburger */}
        <div className="flex items-center justify-between px-4 pt-[27px] pb-[18px]">
          <Link to="/">
            <img src={logo} alt="Order UK Logo" className="w-[154px] h-[38px] object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <Menu size={32} className="text-brand-dark" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Row 2: Promo/basket bar — Login action opens AuthModal instead of navigating */}
        <div className="w-full h-[77px] flex items-center">
          {/* Orange segment — Integrated Login trigger matching desktop styles contextually */}
          <button
            type="button"
            onClick={openLogin}
            className="flex-1 h-full bg-brand-orange flex items-center gap-3 px-5 hover:bg-brand-orange/90 transition-colors"
          >
            {/* Inverted layout to place white profile icon wrapper into deep contrast */}
            <div className="w-[34px] h-[34px] bg-brand-dark rounded-full flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
              </svg>
            </div>
            <span className="text-[16px] font-bold text-brand-dark select-none whitespace-nowrap">
              Login/Signup
            </span>
          </button>

          {/* Green segment — basket icon + price */}
          <div className="flex items-center bg-brand-green h-full w-[220px] justify-center gap-2 shrink-0">
            <img src={basketIcon} alt="Basket" className="w-[38px] h-[38px] object-contain" />
            <span className="text-white font-semibold text-[16px]">GBP 79.89</span>
          </div>
        </div>

        {/* Row 3: Location */}
        <div className="flex items-center gap-2 px-4 pt-[15px] pb-[15px]">
          <img src={locationIcon} alt="Location Pin" className="w-[25px] h-[25px] object-contain shrink-0" />
          <span className="text-[14px] text-black truncate">Lution Street, N4G-00...</span>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="w-full px-4 py-4 flex flex-col gap-4 bg-white border-b border-black/10">
            {navLinks.map((link) =>
              link.label === "Browse Menu" ? (
                <HashLink
                  key={link.label}
                  smooth
                  to="/#menu"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-dark font-medium"
                >
                  {link.label}
                </HashLink>
              ) : link.label === "Restaurants" ? (
                <div key={link.label} className="flex flex-col gap-2">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="flex items-center justify-between text-brand-dark font-medium text-left w-full cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileDropdownOpen && (
                    <div className="flex flex-col gap-2 pl-4 max-h-48 overflow-y-auto border-l-2 border-brand-orange/30 py-1">
                      {restaurants.length === 0 ? (
                        <div className="text-xs text-gray-500">Loading...</div>
                      ) : (
                        restaurants.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => {
                              setMobileDropdownOpen(false);
                              setMenuOpen(false);
                              navigate(`/restaurant/${r.id}`);
                            }}
                            className="text-left text-sm text-brand-dark hover:text-brand-orange py-1 cursor-pointer block truncate"
                          >
                            {r.name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-brand-orange font-semibold" : "text-brand-dark font-medium"
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            {/* Was: <Link to="/login">. Now opens the AuthModal instead of navigating. */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openLogin();
              }}
              className="text-brand-orange font-semibold text-left"
            >
              Login/Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;