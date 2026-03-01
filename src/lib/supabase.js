import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a real client if configured, otherwise create a placeholder
// that won't crash the app during local UI development
let supabase

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn(
    '[Sugar & Bows] Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local for full functionality.'
  )

  // Create a mock client that returns empty results
  // This allows the UI to render without Supabase credentials
  const mockResponse = { data: null, error: null }
  const mockQuery = () => ({
    select: () => mockQuery(),
    eq: () => mockQuery(),
    neq: () => mockQuery(),
    order: () => mockQuery(),
    limit: () => mockQuery(),
    single: () => Promise.resolve(mockResponse),
    then: (resolve) => resolve(mockResponse),
    insert: () => Promise.resolve(mockResponse),
    update: () => Promise.resolve(mockResponse),
    delete: () => Promise.resolve(mockResponse),
  })

  supabase = {
    from: () => mockQuery(),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithOtp: () => Promise.resolve(mockResponse),
      signInWithOAuth: () => Promise.resolve(mockResponse),
      signOut: () => Promise.resolve(mockResponse),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve(mockResponse),
        createSignedUrl: () => Promise.resolve({ data: { signedUrl: '' } }),
      }),
    },
  }
}

export { supabase }
