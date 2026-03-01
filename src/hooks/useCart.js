import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'

export function useCart() {
  const {
    items,
    promoCode,
    discount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromo,
    getSubtotal,
    getItemCount,
  } = useCartStore()

  const { addToast } = useUIStore()

  const handleAddItem = (item) => {
    addItem(item)
    addToast(`${item.productName || 'Item'} added to cart`, 'success')
  }

  const handleRemoveItem = (variantId) => {
    removeItem(variantId)
    addToast('Item removed from cart', 'success')
  }

  return {
    items,
    promoCode,
    discount,
    subtotal: getSubtotal(),
    itemCount: getItemCount(),
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity,
    clearCart,
    applyPromo,
  }
}
