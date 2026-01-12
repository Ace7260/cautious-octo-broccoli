interface ProductBadgeProps {
  type: 'featured' | 'discount' | 'new' | 'low-stock'
  value?: number | string
}

export function ProductBadge({ type, value }: ProductBadgeProps) {
  const badges = {
    featured: {
      bg: 'bg-primary',
      text: 'text-primary-foreground',
      label: 'Vedette'
    },
    discount: {
      bg: 'bg-red-500',
      text: 'text-white',
      label: `-${value}%`
    },
    new: {
      bg: 'bg-green-500',
      text: 'text-white',
      label: 'Nouveau'
    },
    'low-stock': {
      bg: 'bg-orange-500',
      text: 'text-white',
      label: 'Stock limité'
    }
  }

  const badge = badges[type]

  return (
    <div className={`${badge.bg} ${badge.text} px-3 py-1 text-xs font-semibold rounded-full`}>
      {badge.label}
    </div>
  )
}
