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
  productName: string;
  address: string;
  phone: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  createdAt: string;
}

const AdminOrdersPage = () => {
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
          setError(data.message || 'Error fetching orders');
        }
      } catch (error) {
        console.error(error);
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
      <h1 className="text-3xl font-bold mb-6">Admin Orders Panel</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Products</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Payment Method</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center px-4 py-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={`${order.id}-${index}`}>
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">
                    <div>{order.productName}</div>
                    <div className="text-sm text-gray-500">{order.phone}</div>
                    <div className="text-sm text-gray-400">{order.address}</div>
                  </td>

                  {/* Products */}
                  <td className="border px-4 py-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="mb-1">
                        {item.productName} ({item.quantity} × ₹{item.price}) ={' '}
                        <span className="font-semibold">
                          ₹{item.quantity * item.price}
                        </span>
                      </div>
                    ))}
                  </td>

                  <td className="border px-4 py-2 font-semibold">
                    ₹{order.total}
                  </td>
                  <td className="border px-4 py-2 capitalize">
                    {order.paymentMethod}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
