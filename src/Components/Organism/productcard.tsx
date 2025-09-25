'use client'
import Link from 'next/link'

interface ProductCardProps {
  product: {
    id: string | number ;
    name: string;
    price: number;
    image: string;
    description:string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="mt-1 text-xl font-bold text-gray-900">${product.price}</p>
        <p className="mt-1 text-xl text-gray-900">{product.description}</p>
        <Link href={`/products/${product.id}`} passHref>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-full w-full transition-colors duration-300 ease-in-out hover:bg-blue-700">
            View 
          </button>
        </Link>
      </div>
    </div>
  )
}
