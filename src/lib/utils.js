/**
 * Utility functions
 */
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatRelativeDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = date - now
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  if (days < 0) return `${Math.abs(days)} days ago`
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days <= 7) return `In ${days} days`
  if (days <= 30) return `In ${Math.ceil(days / 7)} weeks`
  return formatDate(dateString)
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(str, maxLength = 60) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trim() + '…'
}

export function generateOrderNumber() {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SNB-${year}${rand}`
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function getDaysUntil(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const currentYear = now.getFullYear()
  
  // Set the occasion to this year
  date.setFullYear(currentYear)
  
  // If the date has passed this year, set to next year
  if (date < now) {
    date.setFullYear(currentYear + 1)
  }
  
  const diff = date - now
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
