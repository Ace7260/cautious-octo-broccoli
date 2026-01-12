export function getWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message)
  // Retirer les caractères non numériques du numéro
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '')
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2250000000000'
