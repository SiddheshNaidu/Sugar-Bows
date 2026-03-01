import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(persist((set, get) => ({
  items: [],
  promoCode: null,
  discount: 0,

  addItem: (item) => set((state) => {
    const exists = state.items.find(i => i.variantId === item.variantId && !i.customisationId)
    if (exists && !item.customisationId) {
      return {
        items: state.items.map(i =>
          i.variantId === item.variantId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    }
    return { items: [...state.items, { ...item, quantity: item.quantity || 1 }] }
  }),

  removeItem: (variantId) => set((state) => ({
    items: state.items.filter(i => i.variantId !== variantId),
  })),

  updateQuantity: (variantId, quantity) => set((state) => ({
    items: state.items.map(i =>
      i.variantId === variantId ? { ...i, quantity: Math.max(1, quantity) } : i
    ),
  })),

  clearCart: () => set({ items: [], promoCode: null, discount: 0 }),

  applyPromo: (code, discount) => set({ promoCode: code, discount }),

  getSubtotal: () => {
    const { items } = get()
    return items.reduce((sum, item) => {
      const addonsTotal = (item.addons || []).reduce((a, addon) => a + addon.price, 0)
      return sum + (item.price + addonsTotal) * item.quantity
    }, 0)
  },

  getItemCount: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },
}), { name: 'sb-cart' }))
