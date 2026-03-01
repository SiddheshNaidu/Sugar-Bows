import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProtectedRoute from '@/components/ProtectedRoute'
import ToastContainer from '@/components/ToastContainer'

// Pages
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ProductDetail from '@/pages/ProductDetail'
import Customise from '@/pages/Customise'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import OrderSuccess from '@/pages/OrderSuccess'
import OrderTracking from '@/pages/OrderTracking'
import Occasions from '@/pages/Occasions'
import Account from '@/pages/Account'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'

// Auth listener
import { useAuth } from '@/hooks/useAuth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function AuthInit() {
  useAuth()
  return null
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthInit />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/customise" element={<Customise />} />
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/order/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
          <Route path="/occasions" element={<ProtectedRoute><Occasions /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
