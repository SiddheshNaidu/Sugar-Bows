import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import StepProgress from '@/components/customise/StepProgress'
import PhotoUpload from '@/components/customise/PhotoUpload'
import FramePreview from '@/components/customise/FramePreview'
import CharCounter from '@/components/customise/CharCounter'
import { useCart } from '@/hooks/useCart'

const steps = ['Upload Photo', 'Details', 'Message', 'Preview']

export default function Customise() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [recipientName, setRecipientName] = useState('')
  const [occasionDate, setOccasionDate] = useState('')
  const [message, setMessage] = useState('')

  const handlePhotoUpload = (file) => {
    setPhoto(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setPhotoPreview(e.target.result)
      reader.readAsDataURL(file)
    } else {
      setPhotoPreview(null)
    }
  }

  const canProceed = () => {
    if (currentStep === 0) return !!photo
    if (currentStep === 1) return recipientName.trim() && occasionDate
    if (currentStep === 2) return message.length <= 40
    return true
  }

  const handleAddToCart = () => {
    addItem({
      variantId: 'frame-custom',
      productName: `Custom Frame — ${recipientName}`,
      variantName: 'Personalised Frame',
      price: 599,
      imageUrl: photoPreview,
      customisationId: 'pending',
      addons: [],
    })
    navigate('/cart')
  }

  return (
    <PageWrapper>
      <section className="section">
        <div className="container container--narrow">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="text-overline">Make it personal</span>
            <h1 className="h1">Customise Your Frame</h1>
          </div>

          <StepProgress steps={steps} currentStep={currentStep} />

          <div style={{ minHeight: 360, padding: 'var(--space-6) 0' }}>
            {/* Step 1: Photo */}
            {currentStep === 0 && (
              <div style={{ animation: 'fadeInUp var(--duration-normal) var(--ease-out)' }}>
                <h3 className="h3" style={{ marginBottom: 'var(--space-4)' }}>Upload a Photo</h3>
                <p className="text-body" style={{ marginBottom: 'var(--space-6)' }}>
                  Choose a favourite photo to feature in the frame. High resolution works best.
                </p>
                <PhotoUpload onUpload={handlePhotoUpload} currentPhoto={photoPreview} />
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 1 && (
              <div style={{ animation: 'fadeInUp var(--duration-normal) var(--ease-out)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <h3 className="h3" style={{ marginBottom: 'var(--space-2)' }}>Recipient Details</h3>
                <Input
                  label="Recipient's Name"
                  placeholder="e.g., Mom, Best Friend, Partner"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
                <Input
                  label="Occasion Date"
                  type="date"
                  value={occasionDate}
                  onChange={(e) => setOccasionDate(e.target.value)}
                />
              </div>
            )}

            {/* Step 3: Message */}
            {currentStep === 2 && (
              <div style={{ animation: 'fadeInUp var(--duration-normal) var(--ease-out)' }}>
                <h3 className="h3" style={{ marginBottom: 'var(--space-2)' }}>Add a Message</h3>
                <p className="text-caption" style={{ marginBottom: 'var(--space-4)' }}>
                  A short, heartfelt message that will appear on the frame.
                </p>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="textarea"
                    placeholder="Happy Birthday! You make every day special."
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 45))}
                  />
                  <div style={{ textAlign: 'right', marginTop: 'var(--space-2)' }}>
                    <CharCounter current={message.length} max={40} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {currentStep === 3 && (
              <div style={{ animation: 'fadeInUp var(--duration-normal) var(--ease-out)' }}>
                <h3 className="h3" style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>Preview Your Frame</h3>
                <FramePreview
                  recipientName={recipientName}
                  occasionDate={occasionDate}
                  message={message}
                  photoUrl={photoPreview}
                />
                <p className="text-caption" style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                  This is a preview. We'll send a final proof for your approval before crafting.
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-light-gray)' }}>
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(s => s - 1)}
              disabled={currentStep === 0}
            >
              ← Back
            </Button>
            {currentStep < 3 ? (
              <Button
                variant="primary"
                onClick={() => setCurrentStep(s => s + 1)}
                disabled={!canProceed()}
              >
                Next →
              </Button>
            ) : (
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart — ₹599
              </Button>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
