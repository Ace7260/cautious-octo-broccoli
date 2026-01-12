'use client'

import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Découvrez nos{' '}
              <span className="text-primary">produits</span>{' '}
              de qualité
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Des accessoires et gadgets high-tech sélectionnés avec soin pour vous offrir le meilleur de la technologie.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/products">
                  Découvrir les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
