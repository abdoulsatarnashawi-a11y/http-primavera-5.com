# نشر الشروط والموافقة على Lovable — دليل سريع

## لماذا لم يُنشر تلقائياً؟

هناك **مشروعان منفصلان**:

| | الموقع الحي (Lovable) | مستودع GitHub |
|---|---|---|
| **العنوان** | https://primavera-5.com | `http-primavera-5.com` |
| **التقنية** | React + Vite (Lovable) | Next.js + Prisma |
| **الصفحات القانونية** | ❌ غير موجودة (404) | ✅ موجودة بالكامل |

**دفع الكود إلى GitHub لا ينشر على Lovable** — Lovable لا يستورد مستودعات خارجية، والنشر يتم فقط من داخل محرر Lovable.

## خطوات النشر على Lovable (5 دقائق)

### 1. افتح مشروعك في Lovable
- ادخل إلى [lovable.dev](https://lovable.dev)
- افتح مشروع **Primavera-5** (المرتبط بـ primavera-5.com)

### 2. الصق الأمر في المحادثة
انسخ النص الكامل من الملف:
```
docs/lovable-legal-prompt-bg.txt
```
والصقه في محادثة Lovable.

### 3. انشر الموقع
بعد أن ينتهي Lovable من إضافة الصفحات:
1. اضغط **Publish** (أعلى يمين المحرر)
2. اختر **Publish changes**
3. انتظر حتى تظهر رسالة "Your website is live"

### 4. تحقق
تأكد أن هذه الصفحات تعمل:
- https://primavera-5.com/terms
- https://primavera-5.com/privacy
- https://primavera-5.com/consent
- https://primavera-5.com/legal-info
- https://primavera-5.com/withdrawal

## بديل: نشر نسخة Next.js على Vercel

إذا أردت استخدام نسخة GitHub (Next.js) بدلاً من Lovable:

1. افتح [vercel.com/new](https://vercel.com/new)
2. اربط مستودع `abdoulsatarnashawi-a11y/http-primavera-5.com`
3. أضف متغيرات البيئة:
   - `DATABASE_URL` — قاعدة بيانات PostgreSQL (مثلاً من Neon)
   - `JWT_SECRET` — مفتاح سري عشوائي
4. انشر ثم غيّر DNS لـ `primavera-5.com` من Lovable إلى Vercel

## ملاحظة مهمة

لا يمكن لـ Cursor/Cloud Agent الضغط على **Publish** في Lovable نيابةً عنك — هذه الخطوة تتطلب دخولك إلى حساب Lovable.
