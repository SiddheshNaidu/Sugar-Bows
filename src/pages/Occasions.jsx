import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import OccasionCard from '@/components/occasions/OccasionCard'
import CountdownCard from '@/components/occasions/CountdownCard'
import OccasionModal from '@/components/occasions/OccasionModal'
import { useOccasions } from '@/hooks/useOccasions'

export default function Occasions() {
  const { occasions, isLoading, addOccasion, updateOccasion, deleteOccasion } = useOccasions()
  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleEdit = (occasion) => {
    setEditData(occasion)
    setModalOpen(true)
  }

  const handleSave = (data) => {
    if (editData) {
      updateOccasion.mutate({ id: editData.id, ...data })
    } else {
      addOccasion.mutate(data)
    }
    setEditData(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Remove this occasion reminder?')) {
      deleteOccasion.mutate(id)
    }
  }

  const upcoming = occasions.filter(o => {
    const d = new Date(o.occasion_date)
    d.setFullYear(new Date().getFullYear())
    const diff = d - new Date()
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000
  })

  return (
    <PageWrapper>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
            <div>
              <span className="text-overline">Never miss a moment</span>
              <h1 className="h1">Occasions</h1>
            </div>
            <Button variant="primary" onClick={() => { setEditData(null); setModalOpen(true) }}>
              + Add Occasion
            </Button>
          </div>

          {/* Upcoming Countdowns */}
          {upcoming.length > 0 && (
            <div style={{ marginBottom: 'var(--space-10)' }}>
              <h2 className="h4" style={{ marginBottom: 'var(--space-5)' }}>Coming Up Soon</h2>
              <div className="grid grid--4">
                {upcoming.slice(0, 4).map((occ) => (
                  <CountdownCard key={occ.id} occasion={occ} />
                ))}
              </div>
            </div>
          )}

          {/* All Occasions */}
          {occasions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {occasions.map((occ) => (
                <OccasionCard
                  key={occ.id}
                  occasion={occ}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="empty-state">
              <span className="empty-state__icon">🎂</span>
              <h3 className="empty-state__title">No occasions yet</h3>
              <p className="empty-state__text">Save birthdays and anniversaries — we'll remind you when it's time to send something special.</p>
              <Button variant="primary" onClick={() => setModalOpen(true)} style={{ marginTop: 'var(--space-6)' }}>
                Add Your First Occasion
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <OccasionModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null) }}
        onSave={handleSave}
        editData={editData}
      />
    </PageWrapper>
  )
}
