const express = require('express');
const sgMail = require('@sendgrid/mail');
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
    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    if (!apiKey || !fromEmail) {
      return res.status(500).json({ message: 'SendGrid configuration is not complete. Set SENDGRID_API_KEY and SENDGRID_FROM_EMAIL.' });
    }

    sgMail.setApiKey(apiKey);

    const msg = {
      to: 'mirzaibjagirani@gmail.com',
      from: fromEmail,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    await sgMail.send(msg);
    return res.json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Contact form email error:', error);
    const detail = error.response && error.response.body ? JSON.stringify(error.response.body) : error.message;
    return res.status(500).json({ message: `Failed to send email: ${detail}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
