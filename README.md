# 🚀 ZOLNER E-Commerce - Frontend

Application e-commerce moderne construite avec Next.js 14, React 18, et Supabase.

## ✨ Fonctionnalités

- 🌐 **Internationalisation** : Support FR/EN avec `next-intl`
- 🔐 **Authentification** : JWT avec Supabase Auth
- 🛍️ **Catalogue Produits** : Filtres, recherche, catégories
- 💝 **Wishlist** : Synchronisée avec backend
- 🖼️ **Galerie Images** : Zoom interactif style Amazon
- 📱 **WhatsApp** : Commande directe
- ⭐ **Reviews & Ratings** : Avis clients
- 🎨 **UI Moderne** : Shadcn/ui + Tailwind CSS
- 📱 **Responsive** : Mobile-first design

## 🛠️ Technologies

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **UI Components** : Shadcn/ui
- **Backend** : Supabase (PostgreSQL + API REST)
- **Auth** : Supabase Auth
- **i18n** : next-intl
- **Animations** : Framer Motion

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer .env.local
cp .env.local.example .env.local

# Configurer les variables d'environnement
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Lancer le serveur de développement
npm run dev
```

## 📁 Structure du Projet

```
src/
├── app/
│   ├── [locale]/           # Routes internationalisées
│   │   ├── page.tsx        # Homepage
│   │   ├── products/       # Catalogue produits
│   │   ├── auth/           # Login/Register
│   │   ├── wishlist/       # Wishlist utilisateur
│   │   ├── about/          # À propos
│   │   └── contact/        # Contact
│   └── layout.tsx          # Layout racine
├── components/
│   ├── layout/             # Header, Footer
│   ├── products/           # ProductCard, ProductDetail
│   ├── home/               # Sections homepage
│   └── ui/                 # Shadcn UI components
├── lib/
│   ├── api.ts              # API client (Supabase/Django)
│   ├── supabase.ts         # Client Supabase
│   └── supabase-api.ts     # Fonctions Supabase
├── contexts/
│   └── AuthContext.tsx     # Context d'authentification
├── i18n/
│   ├── config.ts           # Configuration i18n
│   └── request.ts          # Chargement messages
└── middleware.ts           # Middleware i18n
```

## 🌐 Internationalisation

Le projet supporte plusieurs langues :

- 🇫🇷 Français (par défaut)
- 🇬🇧 English

**URLs :**
- `/fr` - Version française
- `/en` - Version anglaise

## 🗄️ Backend

Le projet supporte **deux backends** :

### Option 1 : Supabase (Recommandé)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

**Avantages :**
- ✅ Serverless
- ✅ Gratuit (500MB)
- ✅ Auto-scaling
- ✅ Dashboard moderne

### Option 2 : Django

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

**Détection automatique** : Le système utilise Supabase si les clés sont présentes, sinon Django.

## 🎨 UI/UX

- Design moderne et épuré
- Animations fluides
- Hover effects
- Loading states
- Error handling
- Empty states
- Toast notifications

## 📱 Pages Disponibles

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/[locale]` | Hero, produits, CTA, témoignages |
| Produits | `/[locale]/products` | Catalogue complet avec filtres |
| Détail | `/[locale]/products/[slug]` | Fiche produit avec zoom |
| Login | `/[locale]/auth/login` | Connexion utilisateur |
| Register | `/[locale]/auth/register` | Inscription |
| Wishlist | `/[locale]/wishlist` | Liste de souhaits (protégé) |
| À propos | `/[locale]/about` | À propos de ZOLNER |
| Contact | `/[locale]/contact` | Formulaire de contact |

## 🔐 Authentification

Système d'authentification complet :

- Inscription avec email/password
- Connexion JWT
- Session persistante
- Routes protégées
- Profil utilisateur
- Logout

## 📦 Scripts

```bash
# Développement
npm run dev          # Lancer le dev server

# Production
npm run build        # Build pour production
npm start            # Lancer en production

# Maintenance
npm run lint         # Vérifier le code
npm run type-check   # Vérifier les types TypeScript
```

## 🌟 Fonctionnalités Avancées

### Zoom d'Images
- Hover zoom
- Modal plein écran
- Navigation clavier (← →)
- Thumbnails cliquables
- Preloading des images

### Wishlist
- Ajout/Retrait instantané
- Synchronisation backend
- Protection par authentification
- Page dédiée

### Recherche & Filtres
- Recherche en temps réel
- Filtres par catégorie
- Tri par prix, popularité
- Pagination

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel

# Variables d'environnement à configurer sur Vercel
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Variables d'environnement
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## 📚 Documentation

- [Guide Installation Supabase](../GUIDE_SUPABASE_QUICK_START.md)
- [Documentation Complète](../README_SUPABASE.md)
- [Guide i18n](../GUIDE_INTERNATIONALISATION.md)

## 🤝 Contribution

Contributions bienvenues ! Merci de :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**ZOLNER Team**

---

**Version** : 3.0 - Supabase Edition  
**Date** : Janvier 2026  
**Statut** : ✅ Production Ready

🎉 **Happy Coding!**
