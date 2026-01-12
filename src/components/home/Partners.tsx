'use client'

import { Card } from '@/components/ui/card'

export function Partners() {
  const partners = [
    { name: "TechCorp", logo: "🔷" },
    { name: "StyleBrand", logo: "✨" },
    { name: "AudioPro", logo: "🎵" },
    { name: "HomeDesign", logo: "🏡" },
    { name: "FashionHub", logo: "👗" },
    { name: "GadgetWorld", logo: "⚡" },
    { name: "SportLife", logo: "⚽" },
    { name: "BeautyZone", logo: "💄" }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Nos Marques Partenaires
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous collaborons avec les meilleures marques pour vous offrir des produits 
            de qualité exceptionnelle
          </p>
        </div>

        {/* Grille de logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
          {partners.map((partner, index) => (
            <Card 
              key={index}
              className="p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {partner.logo}
              </div>
              <p className="font-semibold text-sm">{partner.name}</p>
            </Card>
          ))}
        </div>

        {/* Statistiques partenaires */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { value: "50+", label: "Marques partenaires" },
            { value: "500+", label: "Produits disponibles" },
            { value: "98%", label: "Satisfaction client" },
            { value: "10K+", label: "Commandes livrées" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Badges de confiance */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {[
            { icon: "🔒", text: "Paiement sécurisé" },
            { icon: "🚚", text: "Livraison rapide" },
            { icon: "↩️", text: "Retours faciles" },
            { icon: "⭐", text: "Produits authentiques" }
          ].map((badge, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border shadow-sm"
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
