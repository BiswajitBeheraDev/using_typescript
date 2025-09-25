'use client';
import React from 'react';
import  { JSX } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCart, Product } from '@/context/cartcontext';
import products from '../../../../prisma/data/dummydata';
import { Button } from '@/Components/ui/button';

export default function SearchPage(): React.ReactElement {
  const params = useParams();
  const searchParam = params?.search; // string | string[] | undefined

  const search: string | undefined = Array.isArray(searchParam)
    ? searchParam[0]
    : searchParam;

  const { addToCart } = useCart();

  if (!search) {
    return (
      <div className="p-8 text-center text-red-500">
        No search term provided.
      </div>
    );
  }

  const searchTerm: string = decodeURIComponent(search).toLowerCase();

  const results: Product[] = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Results for <span className="text-blue-600">{search}</span>
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((product: Product) => (
            <li
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white flex flex-col"
            >
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600 flex-1">
                {product.description}
              </p>
              <Button
                onClick={() => addToCart(product)}
                className="mt-4  hover:bg-green-700 text-white py-2 px-4 rounded text-lg transition duration-200"
              >
                Add to Cart
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
