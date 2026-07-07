const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ message: 'SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS.' });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: fromEmail,
      replyTo: `${name} <${email}>`,
      to: 'mirzaibjagirani@gmail.com',
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Contact form email error:', error);
    const message = error && error.message ? error.message : 'Failed to send email.';
    return res.status(500).json({ message: `Failed to send email: ${message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
