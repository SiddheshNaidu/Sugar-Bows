import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'

export function useOccasions() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const occasionsQuery = useQuery({
    queryKey: ['occasions', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('occasions')
        .select('*')
        .eq('user_id', user.id)
        .order('occasion_date')

      if (error) throw error
      return data
    },
    enabled: !!user?.id,
  })

  const addOccasion = useMutation({
    mutationFn: async (occasion) => {
      const { data, error } = await supabase
        .from('occasions')
        .insert({ ...occasion, user_id: user.id })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] })
    },
  })

  const updateOccasion = useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data, error } = await supabase
        .from('occasions')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] })
    },
  })

  const deleteOccasion = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('occasions')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['occasions'] })
    },
  })

  return {
    occasions: occasionsQuery.data || [],
    isLoading: occasionsQuery.isLoading,
    error: occasionsQuery.error,
    addOccasion,
    updateOccasion,
    deleteOccasion,
  }
}
