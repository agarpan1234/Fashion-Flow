# Firebase Deployment Guide

## 🚀 Firebase Hosting এ ডেপ্লয় করার নির্দেশনা

### 1. Firebase CLI ইনস্টল

```bash
npm install -g firebase-tools
```

### 2. Firebase এ লগইন

```bash
firebase login
```

### 3. প্রজেক্ট ইনিশিয়ালাইজ

```bash
firebase init
```

নিম্নলিখিত অপশনগুলি সিলেক্ট করুন:
- **Hosting**: Configure files for Firebase Hosting
- **Public directory**: `.` (current directory)
- **Single-page app**: `Yes`
- **Overwrite index.html**: `No`

### 4. Firebase প্রজেক্ট সিলেক্ট

```bash
firebase use fashionflow-ae3c0
```

### 5. Security Rules ডেপ্লয়

```bash
# Firestore Rules
firebase deploy --only firestore:rules

# Storage Rules
firebase deploy --only storage
```

### 6. ওয়েবসাইট ডেপ্লয়

```bash
firebase deploy --only hosting
```

### 7. সব কিছু একসাথে ডেপ্লয়

```bash
firebase deploy
```

## 📋 ডেপ্লয় করার আগে চেকলিস্ট

### ✅ Firebase Console সেটআপ
- [ ] Firebase প্রজেক্ট তৈরি হয়েছে
- [ ] Authentication এনাবল করা হয়েছে
- [ ] Firestore Database তৈরি হয়েছে
- [ ] Storage এনাবল করা হয়েছে
- [ ] Security Rules সেট করা হয়েছে

### ✅ লোকাল ফাইল চেক
- [ ] `index.html` ফাইল আছে
- [ ] `firebase-config.js` ফাইল আছে
- [ ] `firebase-services.js` ফাইল আছে
- [ ] `firebase.json` ফাইল আছে
- [ ] `firestore.rules` ফাইল আছে
- [ ] `storage.rules` ফাইল আছে

### ✅ কনফিগারেশন চেক
- [ ] Firebase কনফিগারেশন সঠিক
- [ ] API Key সঠিক
- [ ] Project ID সঠিক

## 🔧 ট্রাবলশুটিং

### সাধারণ সমস্যা

#### 1. Firebase CLI লগইন সমস্যা
```bash
# Clear cache
firebase logout
firebase login --reauth
```

#### 2. Permission Error
```bash
# Check Firebase project permissions
firebase projects:list
```

#### 3. Build Error
```bash
# Clear cache and retry
firebase deploy --force
```

#### 4. CORS Error
- Firebase Console → Project Settings → General
- Authorized domains এ আপনার ডোমেইন যোগ করুন

## 🌐 Custom Domain সেটআপ

### 1. Domain যোগ করুন
```bash
firebase hosting:channel:deploy production
```

### 2. DNS সেটিংস
- Firebase Console → Hosting → Custom domains
- Add custom domain
- DNS records যোগ করুন

## 📊 Analytics সেটআপ

### 1. Google Analytics
- Firebase Console → Analytics
- Enable Google Analytics
- Tracking ID কপি করুন

### 2. Firebase Analytics
```javascript
// index.html এ যোগ করুন
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics(app);
logEvent(analytics, 'page_view');
```

## 🔒 Security Best Practices

### 1. Environment Variables
```bash
# .env ফাইল তৈরি করুন
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id
```

### 2. API Key Security
- API Key কখনও public repository তে push করবেন না
- Firebase Console → Project Settings → General
- API restrictions সেট করুন

### 3. Domain Restrictions
- Firebase Console → Authentication → Settings
- Authorized domains যোগ করুন

## 📱 Performance Optimization

### 1. Image Optimization
```html
<!-- WebP format ব্যবহার করুন -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Product">
</picture>
```

### 2. Caching
```json
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### 3. Compression
```json
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(js|css|html)",
        "headers": [
          {
            "key": "Content-Encoding",
            "value": "gzip"
          }
        ]
      }
    ]
  }
}
```

## 🚀 Production Deployment

### 1. Production Build
```bash
# Optimize for production
firebase deploy --only hosting --project fashionflow-ae3c0
```

### 2. Environment Variables
```bash
# Production environment variables
firebase functions:config:set production.api_key="your_production_key"
```

### 3. Monitoring
- Firebase Console → Performance
- Firebase Console → Crashlytics
- Firebase Console → Analytics

## 📞 Support

যদি কোন সমস্যা হয়:
1. Firebase Console চেক করুন
2. Firebase CLI logs দেখুন
3. Browser Console এ error দেখুন
4. Firebase documentation পড়ুন

---

**সফল ডেপ্লয়!** 🎉 