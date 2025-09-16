import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendOverdueEmail = async (to: string, name: string, bookTitle: string, dueDate: Date) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject: 'Library Overdue Notice',
    html: `<p>Dear ${name},</p>
      <p>This is a reminder that the book <strong>${bookTitle}</strong> was due on <strong>${dueDate.toDateString()}</strong>.</p>
      <p>Please return it as soon as possible to avoid penalties.</p>
      <p>Thank you,<br/>Library Management</p>`
  };
  await transporter.sendMail(mailOptions);
};

export default { sendOverdueEmail };
