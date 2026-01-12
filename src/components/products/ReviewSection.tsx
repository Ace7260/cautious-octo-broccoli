'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductRating } from './ProductRating'
import { Star, ThumbsUp, ThumbsDown, VerifiedIcon } from 'lucide-react'

interface Review {
  id: number
  user_name: string
  user_avatar?: string
  rating: number
  title: string
  comment: string
  is_verified_purchase: boolean
  helpful_count: number
  unhelpful_count: number
  created_at: string
}

interface ReviewSectionProps {
  reviews: Review[]
  averageRating: number
  reviewCount: number
}

export function ReviewSection({ reviews, averageRating, reviewCount }: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent')

  // Calculer la distribution des notes
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => r.rating === rating).length
    const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0
    return { rating, count, percentage }
  })

  // Trier les avis
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    } else if (sortBy === 'helpful') {
      return b.helpful_count - a.helpful_count
    } else {
      return b.rating - a.rating
    }
  })

  return (
    <div className="space-y-8">
      {/* Résumé des avis */}
      <Card>
        <CardHeader>
          <CardTitle>Avis clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Note moyenne */}
            <div className="text-center md:border-r">
              <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <ProductRating rating={averageRating} reviewCount={reviewCount} size="lg" />
              <p className="text-sm text-muted-foreground mt-2">
                Basé sur {reviewCount} avis
              </p>
            </div>

            {/* Distribution des notes */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtres et tri */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">
          {reviewCount} avis
        </h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('recent')}
          >
            Plus récents
          </Button>
          <Button
            variant={sortBy === 'helpful' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('helpful')}
          >
            Plus utiles
          </Button>
          <Button
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('rating')}
          >
            Meilleures notes
          </Button>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              {/* En-tête de l'avis */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {review.user_avatar || '👤'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.user_name}</span>
                    {review.is_verified_purchase && (
                      <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <VerifiedIcon className="h-3 w-3" />
                        <span>Achat vérifié</span>
                      </div>
                    )}
                  </div>
                  <ProductRating rating={review.rating} size="sm" showCount={false} />
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(review.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Contenu de l'avis */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Utile ({review.helpful_count})</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <ThumbsDown className="h-4 w-4" />
                  <span>({review.unhelpful_count})</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              Aucun avis pour le moment
            </h3>
            <p className="text-muted-foreground">
              Soyez le premier à donner votre avis sur ce produit !
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
