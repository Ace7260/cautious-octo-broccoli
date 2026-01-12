import { Outfit } from "next/font/google"
import "../globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AuthProvider } from "@/contexts/AuthContext"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Vérifier que la locale est valide
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Récupérer les messages de traduction
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} ${outfit.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
