import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function OccasionModal({ isOpen, onClose, onSave, editData }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: editData || {},
  })

  const onSubmit = (data) => {
    onSave(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editData ? 'Edit Occasion' : 'Add Occasion'}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Input
          label="Person's Name"
          placeholder="e.g., Mom"
          error={errors.person_name?.message}
          {...register('person_name', { required: 'Name is required' })}
        />

        <div className="input-group">
          <label className="input-group__label">Relation</label>
          <select
            className="input-group__input"
            {...register('relation')}
          >
            <option value="">Select...</option>
            <option value="Mom">Mom</option>
            <option value="Dad">Dad</option>
            <option value="Partner">Partner</option>
            <option value="Best Friend">Best Friend</option>
            <option value="Sibling">Sibling</option>
            <option value="Colleague">Colleague</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-group__label">Occasion Type</label>
          <select
            className="input-group__input"
            {...register('occasion_type', { required: 'Occasion type is required' })}
          >
            <option value="">Select...</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="mothers_day">Mother's Day</option>
            <option value="graduation">Graduation</option>
            <option value="other">Other</option>
          </select>
          {errors.occasion_type && <span className="input-group__error">{errors.occasion_type.message}</span>}
        </div>

        <Input
          label="Date"
          type="date"
          error={errors.occasion_date?.message}
          {...register('occasion_date', { required: 'Date is required' })}
        />

        <div className="input-group">
          <label className="input-group__label">Remind me before (days)</label>
          <select className="input-group__input" {...register('remind_days_before')}>
            <option value={3}>3 days before</option>
            <option value={7}>7 days before</option>
            <option value={14}>14 days before</option>
            <option value={30}>30 days before</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit">
            {editData ? 'Save Changes' : 'Add Occasion'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
