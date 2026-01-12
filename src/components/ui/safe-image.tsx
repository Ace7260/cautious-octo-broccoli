'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { getImageUrl } from '@/lib/image-utils'

interface SafeImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string | null | undefined
  fallback?: string
}

// Placeholder blur SVG pour un chargement progressif
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

/**
 * Composant Image sécurisé qui gère les erreurs et les images nulles
 * Optimisé avec placeholder blur pour un chargement ultra-rapide
 */
export function SafeImage({ src, fallback, alt, ...props }: SafeImageProps) {
  const [error, setError] = useState(false)
  const [imageUrl] = useState(() => getImageUrl(src, fallback))

  const handleError = () => {
    setError(true)
  }

  // Si erreur, afficher une div de fallback
  if (error) {
    return (
      <div 
        className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 animate-pulse"
      >
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      onError={handleError}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      quality={90}
      loading={props.priority ? undefined : 'lazy'}
      {...props}
    />
  )
}
