'use client';

import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
      <p className="text-lg">Your order has been placed successfully.</p>

      {orderId && (
        <div className="mt-6 border p-4 rounded shadow bg-gray-50">
          <h2 className="font-semibold">Order Summary</h2>
          <p>Order ID: <span className="font-mono">{orderId}</span></p>
          <p>Status: <span className="text-blue-600">Pending</span></p>
        </div>
      )}

      <p className="mt-6 text-gray-600">We’ll notify you when your order is shipped 🚚</p>
    </div>
  );
}
