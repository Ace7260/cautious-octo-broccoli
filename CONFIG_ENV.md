# Configuration des Variables d'Environnement

## Fichier .env.local

Créez un fichier `.env.local` à la racine du dossier `frontend/` avec le contenu suivant:

```env
# URL de l'API Django
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

# Numéro WhatsApp pour les commandes (format international)
NEXT_PUBLIC_WHATSAPP_NUMBER=+2250000000000
```

## Configuration du Numéro WhatsApp

### Format Correct

Le numéro doit être au format international:

✅ **Exemples corrects:**
```
+2250778899000    # Côte d'Ivoire
+33612345678      # France
+1234567890       # USA
+237699887766     # Cameroun
+221776655443     # Sénégal
```

❌ **Exemples incorrects:**
```
0778899000                 # Manque le code pays
+225 07 78 89 90 00       # Espaces non autorisés
+225-07-78-89-90-00       # Tirets non autorisés
```

### Trouver Votre Code Pays

| Pays | Code |
|------|------|
| 🇨🇮 Côte d'Ivoire | +225 |
| 🇫🇷 France | +33 |
| 🇧🇪 Belgique | +32 |
| 🇨🇭 Suisse | +41 |
| 🇨🇦 Canada | +1 |
| 🇸🇳 Sénégal | +221 |
| 🇨🇲 Cameroun | +237 |
| 🇲🇦 Maroc | +212 |
| 🇩🇿 Algérie | +213 |
| 🇹🇳 Tunisie | +216 |

Liste complète: https://countrycode.org/

## Variables pour la Production

Quand vous déployez en production, modifiez ces valeurs:

```env
# URL de votre API en production
NEXT_PUBLIC_API_URL=https://votre-api.com/api

# Votre numéro WhatsApp Business
NEXT_PUBLIC_WHATSAPP_NUMBER=+2250778899000
```

## Test de Configuration

1. Sauvegardez votre fichier `.env.local`
2. Redémarrez le serveur Next.js (`npm run dev`)
3. Allez sur une page produit
4. Cliquez sur "Commander via WhatsApp"
5. Vérifiez que:
   - WhatsApp s'ouvre
   - Le bon numéro est pré-rempli
   - Le message contient les infos du produit

## Dépannage

### WhatsApp ne s'ouvre pas
- Vérifiez que WhatsApp est installé
- Essayez sur mobile
- Vérifiez le format du numéro

### Mauvais numéro affiché
- Vérifiez le fichier `.env.local`
- Redémarrez le serveur Next.js
- Videz le cache du navigateur

### Message vide
- Vérifiez que le backend retourne `whatsapp_message`
- Consultez la console du navigateur pour les erreurs

## Sécurité

⚠️ **Important:**
- Ne commitez JAMAIS le fichier `.env.local`
- Il est déjà dans `.gitignore`
- Utilisez des variables d'environnement sur votre plateforme de déploiement

## Support

Besoin d'aide ? Consultez:
- [QUICKSTART.md](../QUICKSTART.md)
- [CONFIG.md](../CONFIG.md)
- [README.md](./README.md)
