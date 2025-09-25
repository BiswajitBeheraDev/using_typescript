import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

interface PaymentRequestBody {
  name: string;
  address: string;
  phone: string;
  paymentMethod: 'cod' | 'online';
  items: CartItem[];
  total: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PaymentRequestBody;
    const { name, address, phone, paymentMethod, items, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        name,
        address,
        phone,
        paymentMethod,
        total,
        status: "pending",
        createdAt: new Date(),
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
          })),
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.productName },
          unit_amount: Math.round(item.price * 100), // convert $ → cents
        },
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
