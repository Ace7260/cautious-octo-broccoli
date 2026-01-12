import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: "ZOLNER - Boutique en ligne",
  description: "Découvrez nos produits de qualité",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
