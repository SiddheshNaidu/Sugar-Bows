/**
 * Razorpay payment helper
 * SDK is loaded via <script> tag in index.html
 */

export async function initiateRazorpayPayment({ order, user, onSuccess, onFailure }) {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: Math.round(order.total * 100),
    currency: 'INR',
    name: 'Sugar & Bows',
    description: `Order ${order.order_number}`,
    order_id: order.razorpay_order_id,
    prefill: {
      name: user.full_name,
      contact: user.phone,
    },
    theme: { color: '#C2185B' },
    handler: function (response) {
      onSuccess(response)
    },
    modal: {
      ondismiss: onFailure,
    },
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}
