const sgMail = require('@sendgrid/mail');

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
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Contact API error:', error);
    const detail = error.response && error.response.body ? JSON.stringify(error.response.body) : error.message;
    res.status(500).json({ message: `Email send failed: ${detail}` });
  }
};
