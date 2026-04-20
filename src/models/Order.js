import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true }
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  rcImages: {
    frontUrl: { type: String, required: true },
    backUrl: { type: String, default: "" }
  },
  paymentInfo: {
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Success' }
  }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
