'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cartcontext';

interface OrderForm {
  name: string;
  address: string;
  phone: string;
  paymentMethod: 'cod' | 'online';
}

export default function BuyNow() {
  const router = useRouter();
  const { cart, clearCart, updateQuantity } = useCart();
  const [message, setMessage] = useState('');

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderForm>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      paymentMethod: 'cod',
    },
  });

  const onSubmit = async (form: OrderForm) => {
    if (cart.length === 0) {
      setMessage('Your cart is empty!');
      return;
    }

    setMessage('');

    const items = cart.map((item) => ({
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      total: item.price * (item.quantity || 1),
    }));

    try {
      if (form.paymentMethod === 'cod') {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, items, total }),
        });

        const data = await res.json();

        if (data.success) {
          clearCart();
          router.push(`/thank-you?orderId=${data.order.id}`);
        } else {
          setMessage(data.message || 'Failed to place order.');
        }
      } else {
        const res = await fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, items, total }),
        });

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          setMessage('Failed to start payment.');
        }
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buy Now</h1>

      {/* Cart Summary */}
      <div className="border rounded p-4 mb-4">
        <h2 className="font-semibold mb-2">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-16 p-1 border rounded"
                  />
                  <p>₹{item.price * (item.quantity || 1)}</p>
                </div>
              </div>
            ))}
            <hr className="my-2" />
            <p className="font-bold text-right">Total: ₹{total}</p>
          </>
        )}
      </div>

      {/* Customer Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Address"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Phone"
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone must be 10 digits',
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <select
          {...register('paymentMethod', { required: true })}
          className="w-full p-2 border rounded"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
