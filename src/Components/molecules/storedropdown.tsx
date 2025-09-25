'use client';

import { useState } from 'react';
import Link from 'next/link';

interface StoreDropdownProps {
  isMobile?: boolean;
}

const StoreDropdown: React.FC<StoreDropdownProps> = ({ isMobile = false }) => {
  const [storeOpen, setStoreOpen] = useState(false);

  // Categories list (defined in the same file)
  const categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Food-Drink', value: 'food-drink' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Home-Office', value: 'home-office' },
    { label: 'Kitchen-Dining', value: 'kitchen-dining' },
    { label: 'Home-Decor', value: 'home-decor' },
    { label: 'Sports-Fitness', value: 'sports-fitness' },
    { label: 'Toys-Games', value: 'toys-games' },
    { label: 'Apparel', value: 'apparel' },
    { label: 'Hobbies-Music', value: 'hobbies-music' },
    { label: 'Art-Hobbies', value: 'art-hobbies' },
    { label: 'Outdoor-Sports', value: 'outdoor-sports' },
    { label: 'Books', value: 'books' },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={!isMobile ? () => setStoreOpen(true) : undefined}
      onMouseLeave={!isMobile ? () => setStoreOpen(false) : undefined}
    >
      <button
        className="hover:text-gray-200"
        onClick={isMobile ? () => setStoreOpen(!storeOpen) : undefined}
      >
        Store ▾
      </button>

      {storeOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50 max-h-[400px] overflow-y-auto">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/catagory/${cat.value}`}
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                if (isMobile) setStoreOpen(false);
              }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreDropdown;
