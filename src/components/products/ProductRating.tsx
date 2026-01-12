'use client'

import { Star } from 'lucide-react'

interface ProductRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
}

export function ProductRating({ 
  rating, 
  reviewCount = 0, 
  size = 'md',
  showCount = true 
}: ProductRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : star - 0.5 <= rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      
      {showCount && (
        <>
          <span className={`${textSizeClasses[size]} font-medium`}>
            {rating.toFixed(1)}
          </span>
          {reviewCount > 0 && (
            <span className={`${textSizeClasses[size]} text-muted-foreground`}>
              ({reviewCount} avis)
            </span>
          )}
        </>
      )}
    </div>
  )
}
