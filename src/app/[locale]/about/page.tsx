import { Card, CardContent } from '@/components/ui/card'
import { Store, Users, Award, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">À propos de ZOLNER</h1>
        
        {/* Notre Histoire */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ZOLNER est né de la passion pour l'excellence et l'innovation. Depuis nos débuts, nous nous engageons à offrir à nos clients les meilleurs produits avec un service exceptionnel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Notre mission est simple : rendre le shopping en ligne accessible, agréable et sécurisé pour tous.
          </p>
        </section>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Store className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-sm text-muted-foreground">Produits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold mb-1">5000+</div>
              <div className="text-sm text-muted-foreground">Clients</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Années</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold mb-1">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </CardContent>
          </Card>
        </div>

        {/* Nos Valeurs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Qualité</h3>
                <p className="text-sm text-muted-foreground">
                  Nous sélectionnons rigoureusement chaque produit pour garantir la meilleure qualité.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Confiance</h3>
                <p className="text-sm text-muted-foreground">
                  La satisfaction de nos clients est notre priorité absolue.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Nous améliorons constamment notre service pour mieux vous servir.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Notre Engagement */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Notre Engagement</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span>Livraison rapide et sécurisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span>Service client disponible 7j/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span>Retours gratuits sous 30 jours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">✓</span>
                  <span>Paiement 100% sécurisé</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
