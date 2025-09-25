"use client"
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";  // Assuming you have a Button component
import { useCart } from "@/context/cartcontext";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("/api/products");  // fetch from your API or data source
      const data: Product[] = await res.json();
      const selected = data.find((p) => p.id === Number(id));
      setProduct(selected || null);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center p-8 text-red-500"> Loading ....</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded shadow"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-green-700 font-semibold mb-4">${product.price}</p>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
