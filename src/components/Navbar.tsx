import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, Map, Camera, LayoutDashboard, LogIn, LogOut, User, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast({ title: "Berhasil Keluar", description: "Anda telah keluar dari sesi." });
    window.location.href = "/"; 
  };

  const isPrivateMode = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/observasi");

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold font-serif tracking-tight">BioNusantara</span>
        </Link>
        <div className="hidden md:flex items-center gap-1 ml-auto">
          
          {!isPrivateMode ? (
            <>
              <Link to="/">
                <Button variant={location.pathname === "/" ? "default" : "ghost"} size="sm" className="gap-2">
                  <Home className="h-4 w-4" /> Beranda
                </Button>
              </Link>
              <Link to="/jelajah">
                <Button variant={location.pathname === "/jelajah" ? "default" : "ghost"} size="sm" className="gap-2">
                  <Map className="h-4 w-4" /> Jelajah
                </Button>
              </Link>
              <div className="h-6 w-px bg-border mx-2"></div>
              {!isLoggedIn ? (
                <Link to="/login">
                  <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                    <LogIn className="h-4 w-4" /> Masuk
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button variant={location.pathname === "/dashboard" ? "default" : "ghost"} size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Button>
              </Link>
              <Link to="/observasi">
                <Button variant={location.pathname === "/observasi" ? "default" : "ghost"} size="sm" className="gap-2">
                  <Camera className="h-4 w-4" /> Observasi
                </Button>
              </Link>
              <div className="h-6 w-px bg-border mx-3"></div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2">
                <div className="bg-primary/10 p-1.5 rounded-full text-primary">
                  <User className="h-4 w-4" />
                </div>
                <span>Halo, Vina!</span>
              </div>

              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t md:hidden bg-background"
          >
            <div className="flex flex-col gap-1 p-4">
              {!isPrivateMode ? (
                <>
                  <Link to="/" onClick={() => setMobileOpen(false)}>
                    <Button variant={location.pathname === "/" ? "default" : "ghost"} className="w-full justify-start gap-2">
                      <Home className="h-4 w-4" /> Beranda
                    </Button>
                  </Link>
                  <Link to="/jelajah" onClick={() => setMobileOpen(false)}>
                    <Button variant={location.pathname === "/jelajah" ? "default" : "ghost"} className="w-full justify-start gap-2">
                      <Map className="h-4 w-4" /> Jelajah
                    </Button>
                  </Link>
                  <div className="my-2 h-px w-full bg-border"></div>
                  {!isLoggedIn ? (
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <LogIn className="h-4 w-4" /> Masuk
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant={location.pathname === "/dashboard" ? "default" : "ghost"} className="w-full justify-start gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Button>
                  </Link>
                  <Link to="/observasi" onClick={() => setMobileOpen(false)}>
                    <Button variant={location.pathname === "/observasi" ? "default" : "ghost"} className="w-full justify-start gap-2">
                      <Camera className="h-4 w-4" /> Observasi
                    </Button>
                  </Link>
                  <div className="my-2 h-px w-full bg-border"></div>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground">
                    <div className="bg-primary/10 p-1.5 rounded-full text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <span>Halo, Vina!</span>
                  </div>
                  <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" /> Keluar
                  </Button>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;