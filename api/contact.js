const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ message: 'SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS in Vercel environment variables.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: smtpUser,
      replyTo: `${name} <${email}>`,
      to: 'mirzaibjagirani@gmail.com',
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Contact API error:', error);
    const message = error && error.message ? error.message : 'Failed to send email.';
    res.status(500).json({ message: `Email send failed: ${message}` });
  }
};
