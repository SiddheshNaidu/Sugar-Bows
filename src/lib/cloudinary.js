/**
 * Cloudinary image CDN helper
 * Product images are uploaded by admin via Cloudinary Dashboard.
 * Frontend uses auto-optimization URLs.
 */

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''

export function getProductImageUrl(publicId, { width = 800, quality = 'auto' } = {}) {
  if (!cloudName) return publicId // fallback to raw URL if no cloud name
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_${quality},f_auto/${publicId}`
}

export function getProductImageSrcSet(publicId) {
  return [400, 600, 800, 1200]
    .map((w) => `${getProductImageUrl(publicId, { width: w })} ${w}w`)
    .join(', ')
}
