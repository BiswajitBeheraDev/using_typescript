'use client';

import React, { JSX } from 'react';
import { useParams } from 'next/navigation';
import products from '../../../../prisma/data/dummydata';
import ProductCard from '@/Components/Organism/productcard';
import { useCart } from '@/context/cartcontext';
import { Button } from '@/Components/ui/button';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function CatagoryPage(): JSX.Element {
  const params = useParams();
  const catagory = params.catagory as string;

  console.log('catagory param:', catagory);

  const { addToCart } = useCart();

  const filteredProducts: Product[] = products.filter((product) => {
    const catProd = product.category?.toLowerCase();
    const catParam = catagory.toLowerCase();
    console.log('checking product category:', catProd, 'against', catParam);
    return catProd === catParam;
  });

  console.log('filteredProducts:', filteredProducts);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Category: {catagory}
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow">
              <ProductCard product={product} />
              <Button variant={"blue"}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
