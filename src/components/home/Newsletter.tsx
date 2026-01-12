'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Send, CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'inscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')
    
    // Réinitialiser après 5 secondes
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-16 w-16 mx-auto mb-6 opacity-90" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Restez informé de nos offres
          </h2>
          
          <p className="text-lg mb-8 opacity-90">
            Inscrivez-vous à notre newsletter et recevez en exclusivité nos meilleures offres, 
            nouveautés et conseils directement dans votre boîte mail.
          </p>

          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-3" />
              <p className="text-xl font-semibold">Inscription réussie !</p>
              <p className="text-sm opacity-90 mt-2">
                Merci de votre inscription. Consultez votre boîte mail pour confirmer.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/90 text-foreground border-white/20 placeholder:text-muted-foreground"
              />
              <Button 
                type="submit" 
                size="lg"
                variant="secondary"
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                {isSubmitting ? (
                  'Inscription...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    S'inscrire
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-sm opacity-75 mt-4">
            🔒 Vos données sont sécurisées. Pas de spam, désinscription à tout moment.
          </p>

          {/* Avantages newsletter */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "🎁", title: "-10% de bienvenue", desc: "Sur votre première commande" },
              { icon: "⚡", title: "Offres flash", desc: "Avant tout le monde" },
              { icon: "📦", title: "Nouveautés", desc: "En avant-première" }
            ].map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-sm opacity-80">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
