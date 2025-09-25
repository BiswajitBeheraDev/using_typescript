'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import products from '../../../prisma/data/dummydata';

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export function SmallSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct: Product = products[currentSlide];

  return (
    <div className="w-full md:w-[280px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="h-[180px] overflow-hidden">
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            {currentProduct.name}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {currentProduct.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-bold text-blue-700">
            ${currentProduct.price.toFixed(2)}
          </p>
          <Link href={`/product/${currentProduct.id}`}>
            <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-2 pb-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              currentSlide === index
                ? 'bg-blue-600 scale-110'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
