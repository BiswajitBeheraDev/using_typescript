'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import products from '../../../prisma/data/dummydata';

// Define types for the product object
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}


const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Assuming products data is valid and has the correct structure
  const currentProduct: Product = products[currentSlide];

  return (
    <section className="w-full h-screen bg-gray-100">
      <div className="w-full h-full flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black mb-4 text-gray-600">
            {currentProduct.name}
          </h2>
          <p className="text-gray-600 mb-4">{currentProduct.description}</p>
          <p className="text-xl font-semibold text-gray-800 mb-6">
            ${currentProduct.price.toFixed(2)}
          </p>
          <Link href={`/product/${currentProduct.id}`}>
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      
    </section>
  );
};

export default Slider;
