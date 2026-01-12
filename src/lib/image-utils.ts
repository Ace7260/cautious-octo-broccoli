/**
 * Utilitaires pour la gestion des images
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://127.0.0.1:8000'

/**
 * Image de fallback par défaut
 */
export const DEFAULT_PRODUCT_IMAGE = '/placeholder-product.jpg'
export const DEFAULT_CATEGORY_IMAGE = '/placeholder-category.jpg'
export const DEFAULT_AVATAR = '/placeholder-avatar.jpg'

/**
 * Construit l'URL complète d'une image
 */
export function getImageUrl(imagePath: string | null | undefined, fallback: string = DEFAULT_PRODUCT_IMAGE): string {
  // Si pas d'image, retourner le fallback
  if (!imagePath) {
    return fallback
  }

  // Si l'image est déjà une URL complète
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Si l'image commence par /, c'est un chemin relatif au serveur
  if (imagePath.startsWith('/')) {
    return `${API_BASE}${imagePath}`
  }

  // Sinon, on ajoute le préfixe API
  return `${API_BASE}/${imagePath}`
}

/**
 * Récupère l'URL d'une image produit
 */
export function getProductImageUrl(imagePath: string | null | undefined): string {
  return getImageUrl(imagePath, DEFAULT_PRODUCT_IMAGE)
}

/**
 * Récupère l'URL d'une image de catégorie
 */
export function getCategoryImageUrl(imagePath: string | null | undefined): string {
  return getImageUrl(imagePath, DEFAULT_CATEGORY_IMAGE)
}

/**
 * Récupère l'URL d'un avatar utilisateur
 */
export function getAvatarUrl(imagePath: string | null | undefined): string {
  return getImageUrl(imagePath, DEFAULT_AVATAR)
}

/**
 * Récupère toutes les images d'un produit
 */
export function getAllProductImages(product: any): string[] {
  const images: string[] = []
  
  if (product.image) {
    images.push(getProductImageUrl(product.image))
  }
  
  if (product.image_2) {
    images.push(getProductImageUrl(product.image_2))
  }
  
  if (product.image_3) {
    images.push(getProductImageUrl(product.image_3))
  }
  
  if (product.additional_images && Array.isArray(product.additional_images)) {
    product.additional_images.forEach((img: any) => {
      if (img.image) {
        images.push(getProductImageUrl(img.image))
      }
    })
  }
  
  // Si aucune image, retourner au moins le placeholder
  if (images.length === 0) {
    images.push(DEFAULT_PRODUCT_IMAGE)
  }
  
  return images
}
