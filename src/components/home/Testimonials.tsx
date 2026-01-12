'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Cliente fidèle",
      avatar: "👩",
      rating: 5,
      comment: "Excellente boutique ! Produits de qualité, livraison rapide et service client au top. Je recommande vivement !",
      date: "Il y a 2 semaines"
    },
    {
      name: "Thomas Dubois",
      role: "Acheteur vérifié",
      avatar: "👨",
      rating: 5,
      comment: "J'ai commandé plusieurs produits et je n'ai jamais été déçu. Les prix sont compétitifs et la qualité est au rendez-vous.",
      date: "Il y a 1 mois"
    },
    {
      name: "Marie Laurent",
      role: "Cliente satisfaite",
      avatar: "👩‍💼",
      rating: 5,
      comment: "Service client exceptionnel ! J'ai eu un problème avec ma commande et ils l'ont résolu en moins de 24h. Bravo !",
      date: "Il y a 3 semaines"
    },
    {
      name: "Pierre Rousseau",
      role: "Nouveau client",
      avatar: "👨‍💻",
      rating: 5,
      comment: "Première commande et je suis agréablement surpris ! Site facile à utiliser, paiement sécurisé et produit conforme.",
      date: "Il y a 1 semaine"
    },
    {
      name: "Julie Moreau",
      role: "Cliente régulière",
      avatar: "👩‍🎨",
      rating: 5,
      comment: "Les produits sont authentiques et de très bonne qualité. Je commande régulièrement et je suis toujours satisfaite !",
      date: "Il y a 2 mois"
    },
    {
      name: "Lucas Bernard",
      role: "Acheteur vérifié",
      avatar: "👨‍🔧",
      rating: 5,
      comment: "Rapport qualité-prix excellent ! Livraison plus rapide que prévu. Je reviendrai sans hésiter.",
      date: "Il y a 1 semaine"
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-4">
            <Star className="h-4 w-4 fill-current" />
            <span>Avis Clients</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Ce que nos clients disent de nous
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plus de 10 000 clients satisfaits nous font confiance
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note globale */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">4.9</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Note moyenne
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Avis clients vérifiés
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">
                    Recommandent notre boutique
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
