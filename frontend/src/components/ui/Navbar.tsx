import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-950 border-b shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-[1350px] mx-auto w-full">
        {/* Left Section: Logo and Search Bar (50%) */}
        <div className="flex items-center gap-4 w-1/2 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6 text-black dark:text-white" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="relative flex-1 max-w-[400px]">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black dark:text-white" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Right Section: Navigation Links (50%) */}
        <div className="w-1/2 flex justify-center">
          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-12 text-lg font-medium">
            <Link
              to="/"
              className={`pb-1 ${
                location.pathname === "/"
                  ? "font-bold text-gray-900 dark:text-gray-50 border-b-2 border-black dark:border-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`pb-1 ${
                location.pathname === "/profile"
                  ? "font-bold text-gray-900 dark:text-gray-50 border-b-2 border-black dark:border-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              Profile
            </Link>
            <Link
              to="/info"
              className={`pb-1 ${
                location.pathname === "/info"
                  ? "font-bold text-gray-900 dark:text-gray-50 border-b-2 border-black dark:border-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
            >
              Info
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <MenuIcon className="h-6 w-6 text-black dark:text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 text-lg font-medium mt-4">
                <Link
                  to="/"
                  className={`py-1 ${
                    location.pathname === "/"
                      ? "font-bold text-gray-900 dark:text-gray-50 border-b-2 border-black dark:border-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className={`py-1 ${
                    location.pathname === "/profile"
                      ? "font-bold text-gray-900 dark:text-gray-50 border-b-2 border-black dark:border-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/info"
                  className={`py-1 ${
                    location.pathname === "/info"
                      ? "font-bold text-gray-900 dark:text-gray-50 border-b-2 border-black dark:border-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Info
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Icons
function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}