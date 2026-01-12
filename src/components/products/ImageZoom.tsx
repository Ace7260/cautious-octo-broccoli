'use client'

import { useState, useEffect, useRef } from 'react'
import { SafeImage } from '@/components/ui/safe-image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageZoomProps {
  images: string[]
  productName: string
  initialIndex?: number
}

export function ImageZoom({ images, productName, initialIndex = 0 }: ImageZoomProps) {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [selectedThumbnail, setSelectedThumbnail] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  // Précharger TOUTES les images au montage pour un chargement ultra-rapide
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  // Précharger les images adjacentes pour la navigation
  useEffect(() => {
    if (open) {
      const preloadNext = currentIndex < images.length - 1 ? currentIndex + 1 : 0
      const preloadPrev = currentIndex > 0 ? currentIndex - 1 : images.length - 1
      
      const nextImg = new Image()
      nextImg.src = images[preloadNext]
      
      const prevImg = new Image()
      prevImg.src = images[preloadPrev]
    }
  }, [currentIndex, open, images])

  // Navigation au clavier
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsZoomed(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }

  // Comme Amazon : clic sur miniature change l'image principale SANS ouvrir le zoom
  const handleThumbnailClick = (index: number) => {
    setSelectedThumbnail(index)
  }

  // Ouvrir le zoom seulement au clic sur l'image principale
  const handleMainImageClick = () => {
    setCurrentIndex(selectedThumbnail)
    setOpen(true)
  }

  // Hover zoom style Amazon
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <>
      {/* Images principales - Style Amazon */}
      <div className="space-y-4 sticky top-4">
        {/* Image principale avec hover zoom - Style Amazon optimisé */}
        <div 
          ref={imageRef}
          className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden group cursor-zoom-in shadow-md hover:shadow-xl transition-all no-select"
          onClick={handleMainImageClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Image principale avec effet zoom au hover - GPU accelerated */}
          <div className={cn(
            "relative w-full h-full transition-transform duration-200 ease-out image-zoom-hover gpu-accelerated",
            isHovering && "scale-150"
          )}
          style={isHovering ? {
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
          } : undefined}
          >
            <SafeImage
              src={images[selectedThumbnail]}
              alt={productName}
              fill
              className="object-cover fade-in"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* Overlay avec icône zoom - Visible seulement si pas de hover */}
          <div className={cn(
            "absolute inset-0 bg-black/0 transition-all flex items-center justify-center pointer-events-none",
            !isHovering && "group-hover:bg-black/5"
          )}>
            {!isHovering && (
              <div className="opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                <ZoomIn className="h-6 w-6 text-gray-800" />
              </div>
            )}
          </div>

          {/* Badge nombre d'images */}
          {images.length > 1 && (
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10 pointer-events-none">
              {selectedThumbnail + 1} / {images.length}
            </div>
          )}

          {/* Message hover zoom */}
          {isHovering && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium z-10 pointer-events-none">
              Bougez la souris pour explorer • Cliquez pour agrandir
            </div>
          )}
        </div>

        {/* Thumbnails optimisées - Style Amazon */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-md",
                  selectedThumbnail === index
                    ? 'border-primary shadow-md scale-105 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:border-primary/50'
                )}
              >
                <SafeImage
                  src={img}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                {/* Indicateur actif */}
                {selectedThumbnail === index && (
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dialog avec zoom optimisé */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-black/98">
          <div className="relative w-full h-full flex flex-col">
            {/* Header avec contrôles */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-white text-sm font-medium">
                {productName}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Image agrandie avec zoom */}
            <div className="flex-1 flex items-center justify-center p-16 overflow-hidden">
              <div 
                className={cn(
                  "relative transition-transform duration-300",
                  isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <SafeImage
                  src={images[currentIndex]}
                  alt={`${productName} - Image ${currentIndex + 1}`}
                  width={1200}
                  height={1200}
                  className="object-contain max-h-[70vh] max-w-[90vw]"
                  priority
                />
              </div>
            </div>

            {/* Footer avec thumbnails et compteur */}
            {images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-transparent p-4 pb-6">
                {/* Compteur */}
                <div className="text-center text-white text-sm font-medium mb-3">
                  {currentIndex + 1} / {images.length}
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-2 justify-center overflow-x-auto max-w-4xl mx-auto pb-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "relative w-16 h-16 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all hover:scale-110",
                        currentIndex === index
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-white/30 hover:border-white/60'
                      )}
                    >
                      <SafeImage
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
