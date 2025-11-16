import connectDB from '@/lib/mongodb';
import EmaiOtp from '@/models/EmaiOtp';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400 }
      );
    }

    // Generate OTP and hash
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || 5, 10);
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
    // Upsert OTP record
    await EmaiOtp.findOneAndUpdate(
      { email },
      { otpHash, expiresAt, attempts: 0 },
      { upsert: true, new: true }
    );

    // Setup mail transporter
    const transporter = nodemailer.createTransport({
  service: "gmail", // automatically uses smtp.gmail.com with TLS
  auth: {
    user: process.env.SMTP_USER,  // not EMAIL_USER
    pass: process.env.SMTP_PASS,
  },
});


    // Mail content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for ${expiryMinutes} minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for ${expiryMinutes} minutes.</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sending OTP:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
