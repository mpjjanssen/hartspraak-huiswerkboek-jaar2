import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";


export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/aandachtspunten", label: "Aandachtspunten" },
    { path: "/workshop/1", label: "Workshop 1" },
    { path: "/workshop/2", label: "Workshop 2" },
    { path: "/workshop/3", label: "Workshop 3" },
    { path: "/workshop/4", label: "Workshop 4" },
    { path: "/workshop/5", label: "Workshop 5" },
    { path: "/workshop/6", label: "Workshop 6" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <a href="https://www.hartspraak.com" target="_blank" rel="noopener noreferrer">
              <img 
                src="/hartspraak-logo.png" 
                alt="Hartspraak Logo" 
                className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </a>
            <Link href="/">
              <span className="text-xl font-semibold text-primary cursor-pointer">
                Huiswerkboek
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location === item.path
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            
            {/* User Menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.firstName || 'Deelnemer'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Uitloggen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      location === item.path
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/70 hover:bg-accent/50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {/* Mobile User Menu */}
              {user && (
                <>
                  <div className="px-4 py-2 border-t border-border mt-2 pt-4">
                    <p className="text-sm font-medium text-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.firstName || 'Deelnemer'}</p>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-accent/50 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Uitloggen
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
