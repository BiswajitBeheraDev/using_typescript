'use client';

import { useCart } from "@/context/cartcontext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/Components/ui/button";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const { cart, updateQuantity, clearCart, removeFromCart } = useCart();
  const router = useRouter();

  // Calculate total price of the cart, default quantity to 1 if it's undefined
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);

  const handleBuyNow = () => {
    router.push("/Buynow");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded mb-4 flex flex-col md:flex-row gap-4 md:items-center"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={96}
                height={96}
                className="object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button variant={"ghost"}
                    onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}
                  >
                    -
                  </Button>
                  <span className="px-3">{item.quantity ?? 1}</span>
                  <Button variant={"ghost"}
                    onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="self-end md:self-auto">
                <Button
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <Button value={"destructive"}
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
