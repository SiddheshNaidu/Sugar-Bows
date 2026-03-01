import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { useAuthStore } from '@/store/authStore'
import { formatPrice } from '@/lib/utils'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, discount, clearCart } = useCart()
  const { profile } = useAuthStore()
  const [deliveryType, setDeliveryType] = useState('standard')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: profile?.full_name || '',
      phone: profile?.phone || '',
    },
  })

  const deliveryFee = deliveryType === 'express' ? 149 : 0
  const total = subtotal - discount + deliveryFee

  const onSubmit = async (data) => {
    setLoading(true)
    // In production: create Razorpay order via Supabase Edge Function,
    // then open Razorpay modal. For now, simulate success.
    setTimeout(() => {
      clearCart()
      navigate('/order/success')
    }, 1500)
  }

  return (
    <PageWrapper>
      <section className="section">
        <div className="container container--narrow">
          <h1 className="h1" style={{ marginBottom: 'var(--space-8)' }}>Checkout</h1>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {/* Delivery Address */}
            <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', border: '1px solid var(--color-light-gray)' }}>
              <h3 className="h4" style={{ marginBottom: 'var(--space-5)' }}>Delivery Address</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <Input
                  label="Full Name"
                  error={errors.name?.message}
                  {...register('name', { required: 'Name required' })}
                />
                <Input
                  label="Phone"
                  type="tel"
                  error={errors.phone?.message}
                  {...register('phone', { required: 'Phone required' })}
                />
              </div>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Input
                  label="Address Line 1"
                  error={errors.line1?.message}
                  {...register('line1', { required: 'Address required' })}
                />
              </div>
              <Input
                label="Address Line 2"
                {...register('line2')}
                style={{ marginTop: 'var(--space-4)' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                <Input label="City" error={errors.city?.message} {...register('city', { required: 'City required' })} />
                <Input label="Pincode" error={errors.pincode?.message} {...register('pincode', { required: 'Pincode required' })} />
                <Input label="State" error={errors.state?.message} {...register('state', { required: 'State required' })} />
              </div>
            </div>

            {/* Delivery Type */}
            <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', border: '1px solid var(--color-light-gray)' }}>
              <h3 className="h4" style={{ marginBottom: 'var(--space-5)' }}>Delivery Type</h3>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {[
                  { value: 'standard', label: 'Standard', desc: '5-7 business days', price: 'Free' },
                  { value: 'express', label: 'Express', desc: '2-3 business days', price: '₹149' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDeliveryType(opt.value)}
                    style={{
                      flex: 1, padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
                      border: deliveryType === opt.value
                        ? '2px solid var(--color-primary)' : '2px solid var(--color-light-gray)',
                      background: deliveryType === opt.value
                        ? 'var(--color-primary-50)' : 'var(--color-white)',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all var(--duration-fast) var(--ease-out)',
                    }}
                  >
                    <strong style={{ display: 'block', fontSize: 'var(--text-sm)' }}>{opt.label}</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray)' }}>{opt.desc}</span>
                    <span style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', border: '1px solid var(--color-light-gray)' }}>
              <h3 className="h4" style={{ marginBottom: 'var(--space-5)' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-medium-gray)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                    <span>Discount</span><span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery</span>
                  <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'Free'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-light-gray)', fontWeight: 500, fontSize: 'var(--text-base)', color: 'var(--color-black)' }}>
                  <span>Total</span>
                  <span className="text-price text-price--lg">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit" loading={loading}>
              Place Order — {formatPrice(total)}
            </Button>
          </form>
        </div>
      </section>
    </PageWrapper>
  )
}
