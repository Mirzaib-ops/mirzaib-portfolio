# mirzaib-portfolio

A modern developer portfolio showcasing AI, machine learning, and full-stack development work.

This repository contains a static portfolio website built with HTML, CSS, and JavaScript.

Files included:
- `index.html` — main portfolio page
- `styles.css` — layout and visual styles
- `script.js` — drawer navigation and interactive behaviors
- `assets/profile.jpeg` — profile image used on the page
- `assets/resume.pdf` — downloadable resume

Deployment:
- This portfolio is deployed on Vercel at `https://mirzaib-portfolio.vercel.app/`.
- Vercel will automatically install dependencies from `package.json` and run the API route in `api/contact.js`.

Backend form support:
- The contact form now submits to `/api/contact` and sends messages to `mirzaibjagirani@gmail.com`.
- On Vercel, set the following Environment Variables in your project settings:
  - `SMTP_HOST` (optional, default: `smtp.gmail.com`)
  - `SMTP_PORT` (optional, default: `587`)
  - `SMTP_SECURE` (set to `false` for TLS)
  - `SMTP_USER` (your Gmail address, e.g. `your-email@gmail.com`)
  - `SMTP_PASS` (your Gmail App Password)
  - `SMTP_FROM_EMAIL` (optional; defaults to `SMTP_USER`)

> For Gmail, enable 2-Step Verification and create an App Password. Use that App Password as `SMTP_PASS`; do not use your normal Google account password.

Local testing:
- If you want to test locally, you can also run the local server using `server.js`.
- Install dependencies and run:
```bash
npm install
node server.js
```

Example `.env` values for local testing:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
```

Notes:
- Click the profile image to open it in a new tab.
- The top menu drawer handles navigation for all page sections.
