"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SearchBar } from "../molecules/searchbar";
import { Menu, Home, ShoppingCart } from "lucide-react"; // added Home and Cart icons
import { useState } from "react";
import StoreDropdown from "../molecules/storedropdown"; // Import your StoreDropdown component
import SimpleProfileLogo from "./profile";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Desktop Center Section */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-4 px-6">
          {/* Search Bar */}
          <SearchBar />

          {/* Store Dropdown (New Add) */}
          <StoreDropdown isMobile={false} /> {/* Pass `false` to hide mobile dropdown behavior */}

          {/* Icons */}
          <Link href="/Herofile" className="text-gray-700 hover:text-gray-900">
            <Home className="h-6 w-6" />
          </Link>

          <Link href="/cart" className="text-gray-700 hover:text-gray-900">
            <ShoppingCart className="h-6 w-6" />
          </Link>
        </div>
         <SimpleProfileLogo/>
        {/* Login Button */}
        {/* Mobile Menu Button */}
        <Button variant={"ghost"}
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <SearchBar />

          {/* Store Dropdown for Mobile */}
          <StoreDropdown isMobile={true} />

          <div className="flex justify-around">
            <Link href="/Herofile" className="text-gray-700 hover:text-gray-900">
              <Home className="h-6 w-6" />
            </Link>

            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}
