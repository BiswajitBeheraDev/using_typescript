"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cartcontext";

const CartIcon: React.FC = () => {
  const { cart } = useCart();
  const itemCount: number = cart.length;

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      {/* Cart Icon */}
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />

      {/* Item Count Badge */}
       {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
         {cart.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
