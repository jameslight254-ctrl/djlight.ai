import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Mixes", path: "/mixes" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || location !== "/" ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-display font-bold tracking-widest text-white group-hover:text-primary transition-colors">
              DJ
            </span>
            <span className="text-3xl font-script text-primary text-shadow-neon group-hover:text-accent group-hover:text-shadow-neon-accent transition-all duration-300">
              Light
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    location === link.path ? "text-primary text-shadow-neon" : "text-white/70"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <BookingModal>
              <Button className="rounded-full px-6 bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:box-shadow-neon transition-all duration-300">
                Book Now
              </Button>
            </BookingModal>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-display tracking-widest uppercase transition-colors ${
                  location === link.path ? "text-primary text-shadow-neon" : "text-white/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <BookingModal>
              <Button 
                size="lg"
                className="mt-4 rounded-full px-8 bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:box-shadow-neon"
                onClick={() => setMobileOpen(false)}
              >
                Book Now
              </Button>
            </BookingModal>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
