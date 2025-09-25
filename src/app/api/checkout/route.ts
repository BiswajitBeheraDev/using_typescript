import { NextResponse } from 'next/server';
import products from '../../../../prisma/data/dummydata';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, phone, paymentMethod, items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No items in order' },
        { status: 400 }
      );
    }

    // ✅ Create the main order entry first
    const order = await prisma.order.create({
      data: {
        name,
        address,
        phone,
        paymentMethod,
        total: 0, // We'll update this below
        createdAt: new Date(),
      },
    });

    let totalAmount = 0;

    // ✅ Process each item
    for (const item of items) {
      const { productId, quantity } = item;
      const product = products.find((p) => p.id === Number(productId));

      if (!product) {
        continue; // skip invalid product
      }

      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;

      // ✅ Create order item
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          total: itemTotal,
        },
      });
    }

    // ✅ Update total amount in the order
    await prisma.order.update({
      where: { id: order.id },
      data: { total: totalAmount },
    });

    console.log('🛍️ New Order:', order.id);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
