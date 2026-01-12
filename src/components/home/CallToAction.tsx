'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/95 to-primary text-primary-foreground relative overflow-hidden">
      {/* Effets de fond */}
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu Texte */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Offre Spéciale</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Découvrez notre collection exclusive
            </h2>
            
            <p className="text-lg opacity-90 leading-relaxed">
              Profitez de -20% sur tous nos produits vedettes. Livraison gratuite 
              pour toute commande supérieure à 50€. Offre valable jusqu&apos;à la fin du mois !
            </p>
            
            <ul className="space-y-3">
              {[
                "✓ Livraison gratuite dès 50€",
                "✓ Retours gratuits sous 30 jours",
                "✓ Paiement sécurisé 100%",
                "✓ Support client 7j/7"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-lg">
                  <span className="text-xl">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 h-auto"
              >
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Voir les offres
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/about">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Visuels */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl mb-2">🎧</div>
                  <h3 className="font-semibold text-lg mb-1">Audio</h3>
                  <p className="text-sm opacity-80">Premium quality</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl mb-2">📱</div>
                  <h3 className="font-semibold text-lg mb-1">Tech</h3>
                  <p className="text-sm opacity-80">Latest gadgets</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl mb-2">👜</div>
                  <h3 className="font-semibold text-lg mb-1">Fashion</h3>
                  <p className="text-sm opacity-80">Trendy styles</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl mb-2">🏠</div>
                  <h3 className="font-semibold text-lg mb-1">Home</h3>
                  <p className="text-sm opacity-80">Modern design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
