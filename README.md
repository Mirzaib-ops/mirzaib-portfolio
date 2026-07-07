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
  - `SENDGRID_API_KEY` (your SendGrid API key)
  - `SENDGRID_FROM_EMAIL` (a verified sender email in SendGrid)

> Use a verified sender address in SendGrid for `SENDGRID_FROM_EMAIL`. The API route sends the form to `mirzaibjagirani@gmail.com` and sets the visitor email as `replyTo`.

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
SMTP_PASS=your-email-password
```

Notes:
- Click the profile image to open it in a new tab.
- The top menu drawer handles navigation for all page sections.
