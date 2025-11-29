# Environment Variables Setup

To enable email notifications and spam protection, you need to set up the following environment variables in your `.env.local` file:

## Email Configuration
```env
# SMTP Configuration for sending emails
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password

# For Gmail, you'll need to generate an App Password:
# 1. Go to your Google Account settings
# 2. Navigate to Security
# 3. Enable 2-Factor Authentication
# 4. Generate an App Password for "Mail"
```

## reCAPTCHA Configuration
```env
# Google reCAPTCHA keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

## How to Get reCAPTCHA Keys
1. Go to https://www.google.com/recaptcha/admin
2. Register a new site
3. Select reCAPTCHA v2 -> "Invisible reCAPTCHA badge"
4. Add your domain(s)
5. Copy the Site Key and Secret Key

## How to Get Gmail App Password
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Factor Authentication
4. Click on "App passwords"
5. Select "Mail" and your device
6. Copy the generated password