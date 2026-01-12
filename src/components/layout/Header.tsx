'use client'

import { Link } from '@/navigation'
import { Heart, Menu, Search, User, ShoppingCart, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const t = useTranslations()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo à gauche */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('common.zolner')}
            </span>
          </Link>

          {/* Menu centré */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="transition-colors hover:text-primary">
              {t('nav.home')}
            </Link>
            <Link href="/products" className="transition-colors hover:text-primary">
              {t('nav.products')}
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-primary">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            {/* Sélecteur de langue */}
            <LanguageSwitcher />
                      
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            {isAuthenticated && (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            )}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.username || t('nav.account')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t('auth.profile.myProfile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">{t('auth.profile.myOrders')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">{t('auth.profile.myWishlist')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" asChild>
                <Link href="/auth/login">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.login')}
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
