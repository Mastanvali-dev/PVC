import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import ClientOrders from './ClientOrders';

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  let orders = [];

  try {
    await dbConnect();

    const data = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    // ✅ Convert to plain serializable data
    orders = data.map((order) => ({
      ...order,
      _id: order._id.toString(),
      createdAt: order.createdAt?.toISOString(),
      updatedAt: order.updatedAt?.toISOString(),
    }));

  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }

  return <ClientOrders initialOrders={orders} />;
}