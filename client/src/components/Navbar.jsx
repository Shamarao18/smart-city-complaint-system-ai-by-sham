import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Search, Shield, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Report", path: "/complaint", icon: <FileText size={16} /> },
    { name: "Track", path: "/track", icon: <Search size={16} /> },
    { name: "Admin", path: "/login", icon: <Shield size={16} /> }
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all ${scrolled ? "shadow-md py-2" : "py-3"} navbar-glass`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-brand-300 to-brand-500 text-white font-bold">SC</div>
          <div className="text-slate-800 font-semibold">SmartCity Portal</div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {items.map(it => (
            <Link key={it.name} to={it.path} className={`flex items-center gap-2 ${location.pathname === it.path ? "text-brand-700 font-semibold" : "text-slate-700 hover:text-brand-700"}`}>
              {it.icon} {it.name}
            </Link>
          ))}

          <button className="flex items-center gap-2 text-rose-600 hover:text-rose-700">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="p-2 rounded-md">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col items-center gap-3 py-4">
            {items.map(it => (
              <Link key={it.name} to={it.path} onClick={() => setOpen(false)} className="flex items-center gap-2 text-slate-700">
                {it.icon} {it.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}