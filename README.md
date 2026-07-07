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
- Host as a static site on GitHub Pages, Vercel, Netlify, or any static hosting provider.

Backend form support:
- This portfolio now includes a small Node.js backend to send contact form messages to `mirzaibjagirani@gmail.com`.
- Create a `.env` file with SMTP credentials before running the server.

Example `.env` values:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password
```

Install and run:
```bash
npm install express nodemailer
node server.js
```

Notes:
- Click the profile image to open it in a new tab.
- The top menu drawer handles navigation for all page sections.
