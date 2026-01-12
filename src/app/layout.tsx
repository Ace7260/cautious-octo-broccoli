import type { Metadata } from "next"

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
