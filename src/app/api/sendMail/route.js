import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { type, name, email, phone_number, message } = await request.json();

    if (!email || (type === "contact" && (!name || !message))) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adityajadonsingh@gmail.com",
        pass: "tweyyqoxizopiimz",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Admin email content
    const adminMailOptions = {
      from: "adityajadonsingh@gmail.com",
      to: "adityajadonsingh@gmail.com",
      subject:
        type === "contact"
          ? "New Contact Form Submission"
          : "New Newsletter Subscription",
      text:
        type === "contact"
          ? `Name: ${name}\nEmail: ${email}\nPhone: ${phone_number || "N/A"}\nMessage: ${message}`
          : `New subscriber: ${email}`,
    };

    // User thank-you email content
    const userMailOptions = {
      from: "adityajadonsingh@gmail.com",
      to: email,
      subject:
        type === "contact"
          ? "Thank you for contacting us"
          : "Thank you for subscribing",
      text:
        type === "contact"
          ? `Hi ${name},\n\nThank you for reaching out. We’ve received your message and will get back to you soon.\n\nBest regards,\nMPG Stone Team`
          : `Hi,\n\nThank you for subscribing to our newsletter! You'll now receive updates and offers from us.\n\nBest regards,\nMPG Stone Team`,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return new Response(JSON.stringify({ message: "Emails sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      { status: 500 }
    );
  }
}
