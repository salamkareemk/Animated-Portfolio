import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic server-side validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    // Configure SMTP Transporter
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpUser = process.env.SMTP_USER || "salamkareemk@gmail.com";
    const smtpPass = process.env.SMTP_PASS; // Set this in your .env.local

    // Check if we have credentials to send real email
    if (!smtpPass) {
      console.warn("SMTP_PASS environment variable is not defined.");
      console.log("--- SIMULATED PORTFOLIO MESSAGE ---");
      console.log(`To: salamkareemk@gmail.com`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Message: ${message}`);
      console.log("-----------------------------------");
      
      return NextResponse.json({
        success: true,
        message: "Message received (Simulated). Configure SMTP_PASS in .env.local for live delivery."
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Sent from your address to ensure inbox delivery, but with their name
      replyTo: email, // Click 'Reply' in Gmail will reply directly to the sender
      to: "salamkareemk@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 650px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
          <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 12px; margin-top: 0; font-size: 24px; font-weight: bold; tracking: -0.025em;">
            New Portfolio Message
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0; font-size: 16px;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></p>
          </div>
          <div style="margin: 25px 0; padding: 20px; background-color: #f7fafc; border-left: 4px solid #06b6d4; border-radius: 6px;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 15px; color: #2d3748;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="font-size: 12px; color: #a0aec0; text-align: center; margin: 0;">
            This email was sent automatically from your website's contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!"
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const message = error instanceof Error ? error.message : "Failed to send message.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
