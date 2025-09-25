'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  createdAt: string;
}

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/order');
        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || 'No orders found');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const status =
              order.paymentMethod.toLowerCase() === 'online'
                ? 'Success'
                : 'Pending';

            return (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>
                        {item.productName} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-2" />

                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total:</span>
                  <span className="font-semibold">₹{order.total}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Payment: {order.paymentMethod}</span>
                  <span>
                    Status:{' '}
                    <span
                      className={
                        status === 'Success' ? 'text-green-600' : 'text-yellow-600'
                      }
                    >
                      {status}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
