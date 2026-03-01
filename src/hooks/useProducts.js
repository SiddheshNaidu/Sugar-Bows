import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useProducts(category = null) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_variants (*),
          product_images (*)
        `)
        .eq('is_active', true)
        .order('sort_order')

      if (category) {
        query = query.eq('category', category)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_variants (*),
          product_images (*)
        `)
        .eq('slug', slug)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!slug,
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_variants (*),
          product_images (*)
        `)
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('sort_order')
        .limit(8)

      if (error) throw error
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useAddons() {
  return useQuery({
    queryKey: ['addons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('addons')
        .select('*')
        .eq('is_active', true)

      if (error) throw error
      return data
    },
    staleTime: 10 * 60 * 1000,
  })
}
