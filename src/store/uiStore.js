import { create } from 'zustand'

export const useUIStore = create((set) => ({
  mobileMenuOpen: false,
  cartOpen: false,
  toasts: [],

  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleCart: () => set((s) => ({ cartOpen: !s.cartOpen })),
  setCartOpen: (open) => set({ cartOpen: open }),

  addToast: (message, type = 'success') => {
    const id = Date.now()
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })), 3500)
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}))
